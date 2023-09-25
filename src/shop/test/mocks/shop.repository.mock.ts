import { IShopRepository } from '../../repository/shop.repository';

export const mockShopRepository = (): IShopRepository => ({
  getById: jest.fn(),
  getByFields: jest.fn(),
});
