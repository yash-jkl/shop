import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from '../../cart/repository/cart.repository';
import { PaymentRepository } from '../../payments/repository/payment.repository';
import { EmailService } from '../../utils/email/email.service';
import { OrderRepository } from '../repository/order.repository';
import { verifyPayment } from '../../utils/constants';
import { PaymentStatus } from '../../payments/constants';
import { LoggerService } from '../../utils/logger/winstonLogger';
import {
  OrderGetAllFieldReqDto,
  OrderGetAllSortOrderReqDto,
  UserHeaderReqDto,
} from '../dto';
import { NotFoundException } from '../errors';

export interface IOrderService {
  createOrder(verified: verifyPayment, status: PaymentStatus);
  getOrders(
    user: UserHeaderReqDto,
    page: number,
    limit: number,
    sortOrder: OrderGetAllSortOrderReqDto,
    sortField: OrderGetAllFieldReqDto,
  );
}

@Injectable()
export class OrdersService implements IOrderService {
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
        verified.status ? 'success' : 'failed'
      } Email to users with id ${items[0].user_id}`,
    );
    verified.status
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

  async getOrders(
    user: UserHeaderReqDto,
    page: number = 1,
    limit: number = 10,
    sortOrder: OrderGetAllSortOrderReqDto,
    sortField: OrderGetAllFieldReqDto,
  ) {
    this.logger.info(
      `${OrdersService.logInfo} Getting Orders for user with id ${user.id}`,
    );
    const skip = (page - 1) * limit;
    const [orders, total] = await this.orderRepository.getByUserId(
      user.id,
      skip,
      limit,
      sortOrder,
      sortField,
    );
    if (!total) {
      this.logger.warn(
        `${OrdersService.logInfo} Orders not found for user with id ${user.id}`,
      );
      throw new NotFoundException();
    }
    this.logger.info(
      `${OrdersService.logInfo} Got Orders for user with id ${user.id}`,
    );
    return {
      orders,
      total,
    };
  }
}
