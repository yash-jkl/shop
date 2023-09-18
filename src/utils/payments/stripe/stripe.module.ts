import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import stripeConfig from './stripe.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [stripeConfig],
    }),
  ],
  providers: [StripeService],
})
export class StripeModule {}
