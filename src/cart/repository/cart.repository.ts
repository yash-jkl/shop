import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { NotFoundException } from '../errors';

export interface ICartRepository {
  getCart(
    userId: string,
    skip: number,
    limit: number,
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

  async getCart(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<{ cartItems: CartEntity[]; totalCount: number } | null> {
    const [cartItems, totalCount] = await this.cartEntity
      .createQueryBuilder('cart')
      .innerJoin('cart.user', 'user')
      .innerJoinAndSelect('cart.product', 'product')
      .where('user.id = :userId', { userId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return { cartItems, totalCount };
  }

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
    cartItem.quantity -= quantity;
    if (cartItem.quantity > 0) {
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
}
