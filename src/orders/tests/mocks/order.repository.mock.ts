import { IOrderRepository } from '../../repository/order.repository';

export const mockOrderRepository = (): IOrderRepository => ({
  getByUserId: jest.fn(),
  save: jest.fn(),
});
