import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductEntity } from '../products/entities';
import { UserEntity } from '../users/entities';
import { OrderEntity } from './entities/order.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repository/order.repository';
import { LoggerModule } from '../utils/logger/logger.module';
import { PaymentService } from '../payments/services/payment.service';
import { CartRepository } from '../cart/repository/cart.repository';
import { PaymentRepository } from '../payments/repository/payment.repository';
import { EmailService } from '../utils/email/email.service';
import { EmailjsService } from '../utils/email/emailjs/emailjs.service';
import { PaymentsService } from '../utils/payments/payments.service';
import { StripeService } from '../utils/payments/stripe/stripe.service';
import { CartEntity } from 'src/cart/entities';
import { PaymentEntity } from 'src/payments/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ProductEntity,
      UserEntity,
      CartEntity,
      PaymentEntity,
    ]),
    LoggerModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    PaymentService,
    CartRepository,
    PaymentRepository,
    OrderRepository,
    {
      provide: PaymentsService,
      useClass: StripeService,
    },
    {
      provide: EmailService,
      useClass: EmailjsService,
    },
  ],
})
export class OrdersModule {}
