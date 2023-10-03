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

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, CartEntity]),
    LoggerModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    CartRepository,
    {
      provide: PaymentsService,
      useClass: StripeService,
    },
  ],
})
export class PaymentsModule {}
