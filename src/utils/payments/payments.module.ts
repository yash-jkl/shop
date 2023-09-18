import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe/stripe.service';

@Module({
  imports: [StripeModule],
  providers: [
    {
      provide: PaymentsService,
      useClass: StripeService,
    },
  ],
})
export class PaymentsModule {}
