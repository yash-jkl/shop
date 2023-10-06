import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserHeaderReqDto } from '../dto';
import { LoggerService } from '../../utils/logger/winstonLogger';
import { CartRepository } from '../../cart/repository/cart.repository';
import { PaymentsService } from '../../utils/payments/payments.service';
import {
  DatabaseConnectionException,
  NotFoundException,
  PaymentException,
} from '../errors';
import { PaymentCheckoutType, PaymentStatus } from '../constants';
import { PaymentRepository } from '../repository/payment.repository';
import { OrdersService } from '../../orders/services/orders.service';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(CartRepository)
    private readonly cartRepository: CartRepository,

    @Inject(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,

    private readonly paymentsService: PaymentsService,

    private readonly logger: LoggerService,

    private readonly ordersService: OrdersService,
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
      const checkoutId = uuidv4();
      const paymentCheckout: Array<PaymentCheckoutType> = carts.map((cart) => ({
        checkoutId,
        userId: user.id,
        productId: cart.product.id,
        productTitle: cart.product.title,
        productPrice: cart.product.price,
        adminId: cart.product?.admin.id,
        quantity: cart.quantity,
        status: PaymentStatus.PENDING,
      }));
      this.paymentRepository.addPaymentData(paymentCheckout);
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
        checkoutId,
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

  async verify(event: Buffer, signature: any) {
    const verified = this.paymentsService.verifyPayment(event, signature);
    if (!verified.checkoutId) return;
    const status = verified.status
      ? PaymentStatus.SUCCESS
      : PaymentStatus.FAILED;
    this.ordersService.createOrder(verified, status);
    return;
  }
}
