import { TestingModule, Test } from '@nestjs/testing';
import { OrdersController } from '../../orders.controller';
import { OrdersService } from '../../services/orders.service';
import { mockOrderService } from '../mocks/order.service.mock';
import { getOrderOutput, userHeaderInput } from '../constants';

describe('OrderController', () => {
  let ordersService;
  let orderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersController,
        {
          provide: OrdersService,
          useFactory: mockOrderService,
        },
      ],
    }).compile();
    ordersService = module.get<OrdersService>(OrdersService);
    orderController = module.get<OrdersController>(OrdersController);
  });

  it('OrderController', () => {
    expect(OrdersController).toBeDefined();
  });

  describe('getProducts', () => {
    it('Valid Data should return valid Output', async () => {
      ordersService.getOrders.mockReturnValue(getOrderOutput);
      const data = await orderController.getOrders(
        userHeaderInput,
        '1',
        '10',
        'ASC',
        'CreatedAt',
      );
      expect(data).toEqual(getOrderOutput);
    });
    it('Invalid Data should return Refrence Error', async () => {
      ordersService.getOrders.mockReturnValue(getOrderOutput);
      try {
        await orderController.getOrders(
          userHeaderInput,
          'abc',
          '10',
          'ASC',
          'CreatedAt',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(ordersService.getOrders).not.toBeCalled();
      }
    });
  });
});
