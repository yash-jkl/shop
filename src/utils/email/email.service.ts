import { Injectable } from '@nestjs/common';

export interface IEmailService {
  sendEmail(to: string, subject: string, text: string): Promise<boolean>;
  OrderSuccess(
    email: string,
    items: { product_title: string; product_price: number; quantity: number }[],
    total: number,
  ): Promise<void>;
}
@Injectable()
export abstract class EmailService implements IEmailService {
  abstract sendEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<boolean>;

  abstract OrderSuccess(
    email: string,
    items: { product_title: string; product_price: number; quantity: number }[],
    total: number,
  ): Promise<void>;
}
