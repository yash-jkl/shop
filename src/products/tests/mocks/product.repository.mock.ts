import { IProductRepository } from '../../repository/product.repository';

export const mockProductsRepository = (): IProductRepository => ({
  save: jest.fn(),
  getById: jest.fn(),
  updateProduct: jest.fn(),
  getByAdmin: jest.fn(),
});
