import { TestingModule, Test } from '@nestjs/testing';
import { url, userHeaderInput } from '../constants';
import { PaymentController } from '../../payments.controller';
import { PaymentService } from '../../services/payment.service';
import { mockPaymentService } from '../mocks/payment.service.mock';

describe('OrderController', () => {
  let paymentService;
  let paymentController: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentController,
        {
          provide: PaymentService,
          useFactory: mockPaymentService,
        },
      ],
    }).compile();
    paymentService = module.get<PaymentService>(PaymentService);
    paymentController = module.get<PaymentController>(PaymentController);
  });

  it('PaymentController', () => {
    expect(PaymentController).toBeDefined();
  });

  describe('checkout', () => {
    it('Valid Data should return valid Output', async () => {
      paymentService.checkout.mockReturnValue(url);
      const data = await paymentController.checkout(userHeaderInput);
      expect(data).toEqual(url);
    });
  });
});
