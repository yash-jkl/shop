import { Inject, Injectable } from '@nestjs/common';
import { UserHeaderReqDto } from '../dto';
import { LoggerService } from '../../utils/logger/winstonLogger';
import { CartRepository } from '../../cart/repository/cart.repository';
import { PaymentsService } from '../../utils/payments/payments.service';
import {
  DatabaseConnectionException,
  NotFoundException,
  PaymentException,
} from '../errors';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(CartRepository)
    private readonly cartRepository: CartRepository,

    private readonly paymentsService: PaymentsService,
    private readonly logger: LoggerService,
  ) {}
  static logInfo = 'Service - Payment';

  async checkout(user: UserHeaderReqDto) {
    try {
      this.logger.info(
        `${PaymentService.logInfo} get checkout user id: ${user.id}`,
      );
      const carts = await this.cartRepository.checkout(user.id);
      if (!carts) {
        this.logger.warn(
          `${PaymentService.logInfo} Checkout failed - NotFoundException`,
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
        `${PaymentService.logInfo} Checkout successful for user id: ${user.id}`,
      );
      return url;
    } catch (error) {
      if (error instanceof DatabaseConnectionException) {
        this.logger.warn(
          `${PaymentService.logInfo} Checkout failed - DatabaseConnectionException`,
        );
        throw new DatabaseConnectionException();
      } else if (error instanceof PaymentException) {
        this.logger.warn(
          `${PaymentService.logInfo} Checkout failed - PaymentException`,
        );
        throw new PaymentException();
      } else {
        this.logger.error(
          `${PaymentService.logInfo} Unexpected error during checkout`,
          error,
        );
        throw error;
      }
    }
  }

  async verify(event, signature) {
    this.paymentsService.verifyPayment(event, signature);
  }
}
