import { IEmailService } from '../../../utils/email/email.service';

export const mockEmailService = (): IEmailService => ({
  sendEmail: jest.fn(),
});
