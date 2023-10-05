import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from '../../cart/repository/cart.repository';
import { PaymentRepository } from '../../payments/repository/payment.repository';
import { EmailService } from '../../utils/email/email.service';
import { OrderRepository } from '../repository/order.repository';
import { verifyPayment } from '../../utils/constants';
import { PaymentStatus } from '../../payments/constants';
import { LoggerService } from '../../utils/logger/winstonLogger';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(CartRepository)
    private readonly cartRepository: CartRepository,

    @Inject(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,

    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,

    private readonly emailService: EmailService,

    private readonly logger: LoggerService,
  ) {}

  static logInfo = 'Service - Order';

  async createOrder(verified: verifyPayment, status: PaymentStatus) {
    this.logger.info(
      `${OrdersService.logInfo} changing status for payment with id ${verified.checkoutId}`,
    );
    const items = await this.paymentRepository.changePaymentStatus(
      verified.checkoutId,
      status,
    );
    this.logger.info(
      `${OrdersService.logInfo} creating order for users with id ${items[0].user_id}`,
    );
    if (verified.status) {
      items.forEach(
        async (item: {
          user_id: string;
          product_id: string;
          quantity: number;
          product_price: number;
        }) => {
          await this.cartRepository.removeItemFromCart(
            item.user_id,
            item.product_id,
            item.quantity,
          );
          await this.orderRepository.save({
            product: { id: item.product_id },
            user: { id: item.user_id },
            productPrice: item.product_price,
            quantity: item.quantity,
            paymentId: verified.checkoutId,
          });
        },
      );
      this.logger.info(
        `${OrdersService.logInfo} created order for users with id ${items[0].user_id}`,
      );
    }
    this.logger.info(
      `${OrdersService.logInfo} Sending ${
        status ? 'success' : 'failed'
      } Email to users with id ${items[0].user_id}`,
    );
    status
      ? await this.emailService.PaymentSuccess(
          verified.email,
          items,
          verified.amount,
        )
      : await this.emailService.PaymentFailed(verified.email);
    this.logger.info(
      `${OrdersService.logInfo} Sent Email to users with id ${items[0].user_id}`,
    );
  }
}
