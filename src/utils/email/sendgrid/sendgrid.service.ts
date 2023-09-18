import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { env } from '../../../env';

@Injectable()
export class SendgridService {
  async sendEmail(to: string, subject: string, text: string): Promise<boolean> {
    const msg = {
      to,
      from: env.mail.email, // Replace with your email address
      subject,
      text,
    };

    try {
      await sendgrid.send(msg);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
