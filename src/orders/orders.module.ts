import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { PaymentsService } from '../utils/payments/payments.service';
import { StripeService } from '../utils/payments/stripe/stripe.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: PaymentsService,
      useClass: StripeService,
    },
  ],
})
export class OrdersModule {}
