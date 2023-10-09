import { TestingModule, Test } from '@nestjs/testing';
import { OrdersService } from '../../../orders/services/orders.service';
import { PaymentRepository } from '../../repository/payment.repository';
import { LoggerService } from '../../../utils/logger/winstonLogger';
import { mockPaymentRepository, mockPaymentsService } from '../mocks';
import { CartRepository } from '../../../cart/repository/cart.repository';
import { mockCartRepository } from '../../../cart/tests/mocks';
import { mockOrderService } from '../../../orders/tests/mocks/order.service.mock';
import { PaymentService } from '../../services/payment.service';
import { PaymentsService } from '../../../utils/payments/payments.service';
import { PaymentStatus } from '../../constants';
import { NotFoundException } from '../../errors';
import {
  mockCheckoutOutput,
  mockurl,
  url,
  userHeaderInput,
} from '../constants';

describe('Order Service', () => {
  let paymentRepository;
  let cartRepository;
  let paymentService: PaymentService;
  let ordersService;
  let paymentsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        PaymentService,
        {
          provide: PaymentRepository,
          useFactory: mockPaymentRepository,
        },
        {
          provide: CartRepository,
          useFactory: mockCartRepository,
        },
        {
          provide: OrdersService,
          useFactory: mockOrderService,
        },
        {
          provide: PaymentsService,
          useFactory: mockPaymentsService,
        },
      ],
    }).compile();
    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
    cartRepository = module.get<CartRepository>(CartRepository);
    paymentService = module.get<PaymentService>(PaymentService);
    ordersService = module.get<OrdersService>(OrdersService);
    paymentsService = module.get<PaymentsService>(PaymentsService);
  });

  it('PaymentService should be defined', () => {
    expect(PaymentService).toBeDefined();
  });

  describe('checkout', () => {
    it('Valid data should return a url', async () => {
      cartRepository.checkout.mockReturnValue([mockCheckoutOutput]);
      paymentRepository.addPaymentData.mockReturnValue();
      paymentsService.createCheckOutSession.mockReturnValue(mockurl);

      const data = await paymentService.checkout(userHeaderInput);
      expect(data).toEqual(url);
    });

    it('should throw not found expection when cart is empty', async () => {
      cartRepository.checkout.mockReturnValue([]);
      try {
        await paymentService.checkout(userHeaderInput);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('verify', () => {
    it('should create an order with PaymentStatus.SUCCESS when payment is verified successfully', async () => {
      const eventBuffer = Buffer.from('event data');
      const signature = 'signature';
      paymentsService.verifyPayment.mockReturnValue({
        checkoutId: '123',
        status: true,
      });
      await paymentService.verify(eventBuffer, signature);
      expect(ordersService.createOrder).toHaveBeenCalledWith(
        { checkoutId: '123', status: true },
        PaymentStatus.SUCCESS,
      );
    });

    it('should not create an order when payment verification fails', async () => {
      const eventBuffer = Buffer.from('event data');
      const signature = 'signature';
      paymentsService.verifyPayment.mockReturnValue({
        checkoutId: '123',
        status: false,
      });
      await paymentService.verify(eventBuffer, signature);
      expect(ordersService.createOrder).toHaveBeenCalledWith(
        { checkoutId: '123', status: false },
        PaymentStatus.FAILED,
      );
    });
  });
});
