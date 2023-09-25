import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../services/products.service';
import { mockProductsService } from '../mocks';
import { ProductsController } from '../../products.controller';
import {
  adminHeaderInput,
  createProductInput,
  productId,
  productOutput,
} from '../constants';
import { DatabaseConnectionException, NotFoundException } from '../../errors';
import { ProductField, SortOrder } from '../../../utils/constants';

describe('Product Controller', () => {
  let productService;
  let productController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsController,
        {
          provide: ProductsService,
          useFactory: mockProductsService,
        },
      ],
    }).compile();
    productService = module.get<ProductsService>(ProductsService);
    productController = module.get<ProductsController>(ProductsController);
  });
  it('Product Controller should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('Create Products', () => {
    it('Should create Valid product when providing valid data', async () => {
      productService.createProduct.mockReturnValue(true);
      const isProduct = await productController.createProduct(
        adminHeaderInput,
        createProductInput,
      );
      expect(isProduct).toEqual(true);
    });

    it('Should throw Database exception if data is invalid', async () => {
      productService.createProduct.mockRejectedValue(
        new DatabaseConnectionException(),
      );
      try {
        await productController.createProduct(
          adminHeaderInput,
          createProductInput,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseConnectionException);
      }
    });
  });
  describe('Get Products', () => {
    it('Valid id should return valid response', async () => {
      productService.getProducts.mockReturnValue({ products: [productOutput] });
      const products = await productController.getProducts(
        adminHeaderInput,
        '1',
        '1',
        SortOrder.Ascending,
        ProductField.title,
      );
      expect(products).toEqual({ products: [productOutput] });
    });
    it('Invalid fields should throw Not Found Exception', async () => {
      try {
        productService.getProducts.mockRejectedValue(new NotFoundException());
        await productController.getProducts(
          adminHeaderInput,
          '1',
          '1',
          SortOrder.Ascending,
          ProductField.title,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Get Product', () => {
    it('Valid id should return valid response', async () => {
      productService.getProduct.mockReturnValue({ product: productOutput });
      const product = await productController.getProduct(
        adminHeaderInput,
        productId,
      );
      expect(product).toEqual({ product: productOutput });
    });
    it('Invalid id should throw Not Found Exception', async () => {
      try {
        productService.getProduct.mockRejectedValue(new NotFoundException());
        await productController.getProduct(adminHeaderInput, productId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
