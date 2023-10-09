import { ICartService } from '../../services/cart.service';

export const mockCartService = (): ICartService => ({
  addToCart: jest.fn(),
  removeItemFromCart: jest.fn(),
  deleteCart: jest.fn(),
  getCart: jest.fn(),
});
