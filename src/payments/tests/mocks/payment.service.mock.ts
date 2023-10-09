import { IPaymentService } from '../../services/payment.service';

export const mockPaymentService = (): IPaymentService => ({
  checkout: jest.fn(),
  verify: jest.fn(),
});
