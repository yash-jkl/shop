import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '../../repository/order.repository';
import { OrdersService } from '../../services/orders.service';
import { LoggerService } from '../../../utils/logger/winstonLogger';
import { mockEmailService, mockOrderRepository } from '../mocks';
import { PaymentRepository } from '../../../payments/repository/payment.repository';
import { CartRepository } from '../../../cart/repository/cart.repository';
import { EmailService } from '../../../utils/email/email.service';
import { mockCartRepository } from '../../../cart/tests/mocks';
import { mockPaymentRepository } from '../../..//payments/tests/mocks';
import {
  createOrderInputFailure,
  createOrderInputSuccess,
  paymentMock,
} from '../constants';
import { PaymentStatus } from '../../../payments/constants';

describe('Order Service', () => {
  let ordersService: OrdersService;
  let orderRepository;
  let emailService;
  let paymentRepository;
  let cartRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        OrdersService,
        {
          provide: OrderRepository,
          useFactory: mockOrderRepository,
        },
        {
          provide: EmailService,
          useFactory: mockEmailService,
        },
        {
          provide: PaymentRepository,
          useFactory: mockPaymentRepository,
        },
        {
          provide: CartRepository,
          useFactory: mockCartRepository,
        },
      ],
    }).compile();
    ordersService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    emailService = module.get<EmailService>(EmailService);
    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
    cartRepository = module.get<CartRepository>(CartRepository);
  });

  it('orderServices should be defined', () => {
    expect(OrdersService).toBeDefined();
  });

  describe('Create Order', () => {
    it('Success should send Success Email', async () => {
      paymentRepository.changePaymentStatus.mockReturnValue([paymentMock]);
      cartRepository.removeItemFromCart.mockReturnValue();
      orderRepository.save.mockReturnValue();

      await ordersService.createOrder(
        createOrderInputSuccess,
        PaymentStatus.SUCCESS,
      );

      expect(emailService.PaymentSuccess).toBeCalled();
      expect(emailService.PaymentFailed).not.toBeCalled();
    });

    it('Faliure should send faliure Email', async () => {
      paymentRepository.changePaymentStatus.mockReturnValue([paymentMock]);
      // cartRepository.removeItemFromCart.mockReturnValue();
      // orderRepository.save.mockReturnValue();

      await ordersService.createOrder(
        createOrderInputFailure,
        PaymentStatus.FAILED,
      );

      expect(emailService.PaymentFailed).toBeCalled();
      expect(emailService.PaymentSuccess).not.toBeCalled();
    });
  });
});
