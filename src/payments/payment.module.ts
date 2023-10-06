import { Module } from '@nestjs/common';
import { PaymentController } from './payments.controller';
import { PaymentService } from './services/payment.service';
import { PaymentsService } from '../utils/payments/payments.service';
import { StripeService } from '../utils/payments/stripe/stripe.service';
import { CartRepository } from '../cart/repository/cart.repository';
import { LoggerModule } from '../utils/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/entities';
import { PaymentEntity } from './entities/payment.entities';
import { PaymentRepository } from './repository/payment.repository';
import { EmailService } from '../utils/email/email.service';
import { EmailjsService } from '../utils/email/emailjs/emailjs.service';
import { OrderRepository } from '../orders/repository/order.repository';
import { OrderEntity } from 'src/orders/entities';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, CartEntity, OrderEntity]),
    LoggerModule,
    OrdersModule,
  ],
  controllers: [PaymentController],
  providers: [
    OrdersService,
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
export class PaymentsModule {}
