import { IPayments } from '../../../utils/payments/payments.service';

export const mockPaymentsService = (): IPayments => ({
  createCheckOutSession: jest.fn(),
  verifyPayment: jest.fn(),
});
