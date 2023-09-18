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
      success_url: 'http://localhost:3001/docs',
      cancel_url: 'http://localhost:3001/docs',
      customer_email: user.email,
    });
    return session;
  }

  async verifyPayment(data, signature): Promise<boolean> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        data,
        signature,
        env.payments.stripe.endPointSecrert,
      );

      if (event.type === 'invoice.payment_succeeded') {
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      return false;
    }
  }
}
