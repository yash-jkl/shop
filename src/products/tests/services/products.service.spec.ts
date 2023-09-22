import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../services/products.service';
import { LoggerService } from '../../../utils/logger/winstonLogger';
import { ProductRepository } from '../../repository/product.repository';
import { mockProductsRepository } from '../mocks/product.repository.mock';
import { AdminRepository } from '../../../admin/repository/admin.repository';
import { mockAdminRepository } from '../../../admin/tests/mocks';
import {
  adminHeaderInput,
  adminOutput,
  createProductInput,
  fieldExample,
  limitExample,
  orderExample,
  productOutput,
  pageExample,
} from '../constants';
import { DatabaseConnectionException, NotFoundException } from '../../errors';

describe('Products Service', () => {
  let productsService: ProductsService;
  let productRepository;
  let adminRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        LoggerService,
        {
          provide: ProductRepository,
          useFactory: mockProductsRepository,
        },
        {
          provide: AdminRepository,
          useFactory: mockAdminRepository,
        },
      ],
    }).compile();
    productsService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<ProductRepository>(ProductRepository);
    adminRepository = module.get<AdminRepository>(AdminRepository);
  });

  it('productsService should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('createProduct', () => {
    it('Providing Valid Data should return true', async () => {
      adminRepository.getById.mockReturnValue(adminOutput);
      productRepository.save.mockReturnValue(productOutput);
      const product = await productsService.createProduct(
        adminHeaderInput,
        createProductInput,
      );
      expect(product).toEqual(true);
    });

    it('Providing Invalid should return true', async () => {
      adminRepository.getById.mockRejectedValue(new NotFoundException());
      try {
        await productsService.createProduct(
          adminHeaderInput,
          createProductInput,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseConnectionException);
      }
    });
  });

  describe('getProducts', () => {
    it('Providing Valid Data for all product', async () => {
      productRepository.getByAdmin.mockReturnValue([productOutput]);
      const product = await productsService.getProducts(
        adminHeaderInput,
        pageExample,
        limitExample,
        orderExample,
        fieldExample,
      );
      expect(product).toEqual({ products: [productOutput] });
    });

    it('Providing Invalid should return DatabaseConnectionException', async () => {
      productRepository.getByAdmin.mockReturnValue([]);
      try {
        await productsService.getProducts(
          adminHeaderInput,
          pageExample,
          limitExample,
          orderExample,
          fieldExample,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseConnectionException);
      }
    });
  });

  describe('getProduct', () => {
    it('Providing Valid Data should return product', async () => {
      productRepository.getById.mockReturnValue(productOutput);
      const product = await productsService.getProduct(
        adminHeaderInput,
        productOutput.id,
      );
      expect(product).toEqual({ product: productOutput });
    });

    it('Providing Invalid should return DatabaseConnectionException', async () => {
      productRepository.getById.mockReturnValue(null);
      try {
        await productsService.getProduct(adminHeaderInput, productOutput.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
