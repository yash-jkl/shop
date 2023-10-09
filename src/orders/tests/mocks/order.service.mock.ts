import { IOrderService } from '../../../orders/services/orders.service';

export const mockOrderService = (): IOrderService => ({
  createOrder: jest.fn(),
  getOrders: jest.fn(),
});
