import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { NotFoundException } from '../errors';

export interface ICartRepository {
  getCart(
    userId: string,
  ): Promise<{ cartItems: CartEntity[]; totalCount: number } | null>;
  addItem(userId: string, productId: string, quantity: number): Promise<void>;
  removeItemFromCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;
  deleteCartItems(userId: string): Promise<void>;
}

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartEntity: Repository<CartEntity>,
  ) {}

  async addItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    let cartItem = await this.cartEntity
      .createQueryBuilder('cart')
      .innerJoinAndSelect('cart.user', 'user')
      .innerJoinAndSelect('cart.product', 'product')
      .where('user.id = :userId', { userId })
      .andWhere('product.id = :productId', { productId })
      .getOne();
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartEntity.create({
        user: { id: userId },
        product: { id: productId },
        quantity: quantity,
      });
    }
    await cartItem.save();
  }

  async removeItemFromCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const cartItem = await this.cartEntity
      .createQueryBuilder('cart')
      .innerJoinAndSelect('cart.user', 'user')
      .innerJoinAndSelect('cart.product', 'product')
      .where('user.id = :userId', { userId })
      .andWhere('product.id = :productId', { productId })
      .getOne();
    if (!cartItem) {
      throw new NotFoundException();
    }
    if (cartItem.quantity > quantity) {
      cartItem.quantity -= quantity;
      await cartItem.save();
    } else {
      await this.cartEntity.remove(cartItem);
    }
  }

  async deleteCartItems(userId: string): Promise<void> {
    const cartItems = await this.cartEntity
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getMany();
    await this.cartEntity.remove(cartItems);
  }

  async getCart(
    userId: string,
  ): Promise<{ cartItems: CartEntity[]; totalCount: number } | null> {
    const [cartItems, totalCount] = await this.cartEntity
      .createQueryBuilder('cart')
      .innerJoin('cart.user', 'user')
      .innerJoinAndSelect('cart.product', 'product')
      .where('user.id = :userId', { userId })
      .getManyAndCount();
    return { cartItems, totalCount };
  }

  async checkout(userId: string): Promise<CartEntity[] | null> {
    const checkout = await this.cartEntity
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.product', 'product')
      .leftJoinAndSelect('product.admin', 'admin')
      .where('cart.user.id = :userId', { userId })
      .getMany();
    return checkout;
  }
}
