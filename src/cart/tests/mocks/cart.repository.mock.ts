import { ICartRepository } from '../../repository/cart.repository';

export const mockCartRepository = (): ICartRepository => ({
  addItem: jest.fn(),
  deleteCartItems: jest.fn(),
  getCart: jest.fn(),
  removeItemFromCart: jest.fn(),
});
