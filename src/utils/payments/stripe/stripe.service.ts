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
      client_reference_id: '1234566',
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: 'http://localhost:3001/swagger',
      cancel_url: 'http://localhost:3001/swagger',
      customer_email: user.email,
    });
    return session;
  }

  async verifyPayment(data, signature): Promise<boolean> {
    console.log('Stripe service');
    try {
      const event = this.stripe.webhooks.constructEvent(
        data,
        signature,
        env.payments.stripe.endPointSecrert,
      );
      console.log('event');
      const eventData: any = event.data.object;
      console.log(eventData?.id as any);
      const sessionWithLineItems = await this.stripe.checkout.sessions.retrieve(
        eventData?.id,
        {
          expand: ['line_items'],
        },
      );
      const lineItems = sessionWithLineItems.line_items;
      console.log(...lineItems.data);

      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object;
          return false;
        case 'checkout.session.async_payment_succeeded':
          const checkoutSessionAsyncPaymentSucceeded = event.data.object;
          return true;
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          return true;
        case 'checkout.session.expired':
          const checkoutSessionExpired = event.data.object;
          return false;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
