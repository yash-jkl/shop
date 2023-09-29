import { Helper } from '../helper/helper';
import { Inject, Injectable } from '@nestjs/common';
import { AddToCartReqDto, UserHeaderReqDto } from '../dto';
import { CartRepository } from '../repository/cart.repository';
import { LoggerService } from '../../utils/logger/winstonLogger';
import { PaymentsService } from '../../utils/payments/payments.service';
import {
  DatabaseConnectionException,
  NotFoundException,
  PaymentException,
} from '../errors';

export interface ICartService {}

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CartRepository)
    private readonly cartRepository: CartRepository,

    private readonly helper: Helper,

    private readonly logger: LoggerService,

    private readonly paymentsService: PaymentsService,
  ) {}

  static logInfo = 'Service - Cart';

  async addToCart(user: UserHeaderReqDto, data: AddToCartReqDto) {
    this.logger.info(
      `${CartService.logInfo} Adding product with: ${data.productId} to the cart of user id: ${user.id}`,
    );
    try {
      await this.cartRepository.addItem(user.id, data.productId, data.quantity);
    } catch (error) {
      this.logger.warn(
        `${CartService.logInfo} Adding product with: ${data.productId} to the cart of user id: ${user.id} failed`,
      );
      throw new DatabaseConnectionException();
    }
    this.logger.info(
      `${CartService.logInfo} Added product with: ${data.productId} to the cart of user id: ${user.id}`,
    );
    return;
  }

  async removeItemFromCart(user: UserHeaderReqDto, data: AddToCartReqDto) {
    this.logger.info(
      `${CartService.logInfo} removing product ${data.productId} of quantity ${data.quantity} for user id: ${user.id}`,
    );
    try {
      await this.cartRepository.removeItemFromCart(
        user.id,
        data.productId,
        data.quantity,
      );
    } catch (error) {
      this.logger.warn(
        `${CartService.logInfo} Removed product with: ${data.productId} to the cart of user id: ${user.id} failed`,
      );
      throw new NotFoundException();
    }
    this.logger.info(
      `${CartService.logInfo} Removed product with: ${data.productId} to the cart of user id: ${user.id}`,
    );
    return;
  }

  async deleteCart(user: UserHeaderReqDto) {
    this.logger.info(
      `${CartService.logInfo} Removed cart for user id: ${user.id}`,
    );
    try {
      await this.cartRepository.deleteCartItems(user.id);
    } catch (error) {
      this.logger.warn(
        `${CartService.logInfo} Removed cart for user id: ${user.id} failed`,
      );
      throw new NotFoundException();
    }
    this.logger.info(
      `${CartService.logInfo} Removed cart of user id: ${user.id}`,
    );
    return;
  }

  async getCart(user: UserHeaderReqDto) {
    this.logger.info(
      `${CartService.logInfo} get Cart total amount user id: ${user.id}`,
    );
    try {
      const cart = await this.cartRepository.getCart(user.id);
      const total = this.helper.getTotal(cart.cartItems);
      const response = {
        items: total.items,
        totalItems: cart.totalCount,
        total: total.total,
      };
      this.logger.info(
        `${CartService.logInfo} got Cart total amount user id: ${user.id}`,
      );
      return response;
    } catch (error) {
      this.logger.warn(
        `${CartService.logInfo} get Cart total amount user id: ${user.id} failed`,
      );
      throw new NotFoundException();
    }
  }

  async checkout(user: UserHeaderReqDto) {
    try {
      this.logger.info(
        `${CartService.logInfo} get checkout user id: ${user.id}`,
      );
      const carts = await this.cartRepository.checkout(user.id);
      if (!carts) {
        this.logger.warn(
          `${CartService.logInfo} Checkout failed - NotFoundException`,
        );
        throw new NotFoundException();
      }

      const items = carts.map((cart) => ({
        price_data: {
          currency: 'INR',
          product_data: {
            name: cart.product.title,
          },
          unit_amount: cart.product.price * 100,
        },
        quantity: cart.quantity,
      }));

      const { url } = await this.paymentsService.createCheckOutSession(
        user,
        items,
      );

      this.logger.info(
        `${CartService.logInfo} Checkout successful for user id: ${user.id}`,
      );
      return url;
    } catch (error) {
      if (error instanceof DatabaseConnectionException) {
        this.logger.warn(
          `${CartService.logInfo} Checkout failed - DatabaseConnectionException`,
        );
        throw new DatabaseConnectionException();
      } else if (error instanceof PaymentException) {
        this.logger.warn(
          `${CartService.logInfo} Checkout failed - PaymentException`,
        );
        throw new PaymentException();
      } else {
        this.logger.error(
          `${CartService.logInfo} Unexpected error during checkout`,
          error,
        );
        throw error;
      }
    }
  }
}
