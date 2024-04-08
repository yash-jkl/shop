import { Injectable } from '@nestjs/common';
import { env } from '../../../env';
import Stripe from 'stripe';
import { LoggerService } from '../../logger/WinstonLogger';
import { verifyPayment } from '../../constants';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private readonly logger: LoggerService) {
    this.stripe = new Stripe(env.payments.stripe.secretKey, {
      apiVersion: '2023-08-16',
    });
  }
  static logInfo = 'Utils - Payment - Stripe';

  async createCheckOutSession(id: string, user, items: any[]): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      client_reference_id: id,
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: 'http://localhost:3001/swagger',
      cancel_url: 'http://localhost:3001/swagger',
      customer_email: user.email,
    });
    return session;
  }

  verifyPayment(
    data: string | Buffer,
    signature: string | Buffer | string[],
  ): verifyPayment {
    try {
      const event = this.stripe.webhooks.constructEvent(
        data,
        signature,
        env.payments.stripe.endPointSecrert,
      );

      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed: any = event.data.object;
          return {
            status: false,
            checkoutId: checkoutSessionAsyncPaymentFailed?.client_reference_id,
            email: checkoutSessionAsyncPaymentFailed?.customer_details.email,
          };
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded: any = event.data.object;
          return {
            status: true,
            checkoutId:
              checkoutSessionAsyncPaymentSucceeded.client_reference_id,
            amount: checkoutSessionAsyncPaymentSucceeded.amount_total,
            email: checkoutSessionAsyncPaymentSucceeded?.customer_details.email,
          };
        case 'checkout.session.completed':
          const checkoutSessionCompleted: any = event.data.object;
          return {
            status: true,
            checkoutId: checkoutSessionCompleted.client_reference_id,
            amount: checkoutSessionCompleted.amount_total,
            email: checkoutSessionCompleted?.customer_details.email,
          };
        case 'checkout.session.expired':
          const checkoutSessionExpired: any = event.data.object;
          return {
            status: false,
            checkoutId: checkoutSessionExpired?.client_reference_id,
            email: checkoutSessionExpired?.customer_details.email,
          };
        // ... handle other event types
        default:
          this.logger.warn(
            `${StripeService.logInfo} Unhandled event type ${event.type}`,
          );
          return { status: false };
      }
    } catch (error) {
      this.logger.error(`${StripeService.logInfo} Signature Error `, error);
      return { status: false };
    }
  }
}
