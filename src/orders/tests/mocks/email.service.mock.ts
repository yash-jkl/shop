import { IEmailService } from 'src/utils/email/email.service';

export const mockEmailService = (): IEmailService => ({
  sendEmail: jest.fn(),
  PaymentFailed: jest.fn(),
  PaymentSuccess: jest.fn(),
});
