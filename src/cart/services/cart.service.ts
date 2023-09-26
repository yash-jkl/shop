import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from '../repository/cart.repository';
import {
  AddToCartReqDto,
  CartGetAllLimitReqDto,
  CartGetAllPageReqDto,
  UserHeaderReqDto,
} from '../dto';
import { LoggerService } from '../../utils/logger/winstonLogger';
import { DatabaseConnectionException, NotFoundException } from '../errors';

export interface ICartService {}

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CartRepository)
    private readonly cartRepository: CartRepository,

    private readonly logger: LoggerService,
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

  async getCart(
    user: UserHeaderReqDto,
    page: CartGetAllPageReqDto,
    limit: CartGetAllLimitReqDto,
  ) {
    this.logger.info(
      `${CartService.logInfo} Getting Cart for user id: ${user.id}`,
    );
    const skip = (+page - 1) * +limit;
    try {
      const cart = await this.cartRepository.getCart(user.id, skip, +limit);
      console.log('Cart', cart);
      this.logger.info(
        `${CartService.logInfo} Got Cart for user id: ${user.id}`,
      );
      return cart;
    } catch (error) {
      this.logger.warn(
        `${CartService.logInfo} Getting Cart failed for user id: ${user.id} failed`,
      );
      throw new NotFoundException();
    }
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
}
