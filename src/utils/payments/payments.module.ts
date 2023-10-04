import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe/stripe.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [StripeModule, LoggerModule],
  providers: [
    {
      provide: PaymentsService,
      useClass: StripeService,
    },
  ],
})
export class PaymentsModule {}
