import { IPaymentRepository } from 'src/payments/repository/payment.repository';

export const mockPaymentRepository = (): IPaymentRepository => ({
  addPaymentData: jest.fn(),
  changePaymentStatus: jest.fn(),
});
