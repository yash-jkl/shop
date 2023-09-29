import { Injectable } from '@nestjs/common';
import { env } from '../../../env';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(env.payments.stripe.secretKey, {
      apiVersion: '2023-08-16',
    });
  }

  async createCheckOutSession(user, items: any[]): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: 'http://localhost:3001/swagger',
      cancel_url: 'http://localhost:3001/swagger',
      customer_email: user.email,
    });
    return session;
  }

  async verifyPayment(data, signature): Promise<number> {
    console.log('Stripe service')
    try {
      console.log('data', data)
      console.log('************************')
      console.log('signature', signature)
      console.log('************************')
      console.log('endPointSecrert', env.payments.stripe.endPointSecrert)
      console.log('************************')
      const event = this.stripe.webhooks.constructEvent(
        data,
        signature,
        env.payments.stripe.endPointSecrert
      );
      console.log('event')
      console.log(event)

      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object;
          return 0
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded = event.data.object;
          return 1
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          return 2
        case 'checkout.session.expired':
          const checkoutSessionExpired = event.data.object;
          return -1
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.log('error', error)
      return -1;
    }
  }
}
