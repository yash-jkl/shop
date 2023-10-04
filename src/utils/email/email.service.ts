import { Injectable } from '@nestjs/common';

export interface IEmailService {
  sendEmail(to: string, subject: string, text: string): Promise<boolean>;
  PaymentSuccess(
    email: string,
    items: { product_title: string; product_price: number; quantity: number }[],
    total: number,
  ): Promise<void>;

  PaymentFailed(email: string): Promise<void>;
}
@Injectable()
export abstract class EmailService implements IEmailService {
  abstract sendEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<boolean>;

  abstract PaymentSuccess(
    email: string,
    items: { product_title: string; product_price: number; quantity: number }[],
    total: number,
  ): Promise<void>;

  abstract PaymentFailed(email: string): Promise<void>;
}
