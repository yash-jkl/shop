import { IShopService } from '../../services/shop.service';

export const mockShopService = (): IShopService => ({
  getProducts: jest.fn(),
  getProduct: jest.fn(),
});
