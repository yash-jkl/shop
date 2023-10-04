import { Injectable } from '@nestjs/common';
import emailjs from '@emailjs/nodejs';
import { env } from '../../../env';

@Injectable()
export class EmailjsService {
  async sendEmail(to: string, subject: string, text: string): Promise<boolean> {
    const templateParams = {
      to,
      subject,
      message: text,
    };

    try {
      await emailjs.send(
        env.mail.emailjs.serviceId,
        env.mail.emailjs.templateId,
        templateParams,
        {
          publicKey: env.mail.emailjs.publicKey,
          privateKey: env.mail.emailjs.privateKey,
        },
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async OrderSuccess(
    email: string,
    items: { product_title: string; product_price: number; quantity: number }[],
    total: number,
  ) {
    const subject = `Payment Successful - Your Order is On its Way 🏎️`;
    const message = JSON.stringify({
      items,
      total,
    });
    this.sendEmail(email, subject, message);
  }
}
