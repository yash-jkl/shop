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
}
