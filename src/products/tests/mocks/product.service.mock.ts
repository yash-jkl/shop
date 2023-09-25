import { IProductsService } from '../../services/products.service';

export const mockProductsService = (): IProductsService => ({
  createProduct: jest.fn(),
  getProducts: jest.fn(),
  getProduct: jest.fn(),
});
