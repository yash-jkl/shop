import { Injectable } from '@nestjs/common';

export interface IEmailService {
  sendEmail(to: string, subject: string, text: string): Promise<boolean>;
}
@Injectable()
export abstract class EmailService implements IEmailService {
  abstract sendEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<boolean>;
}
