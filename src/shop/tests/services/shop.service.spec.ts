import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../services/shop.service';
import { LoggerService } from '../../../utils/logger/winstonLogger';
import { ShopRepository } from '../../repository/Shop.repository';
import { mockShopRepository } from '../mocks/shop.repository.mock';
import {
  fieldExample,
  limitExample,
  orderExample,
  pageExample,
  productOutput,
} from '../constants';
import { DatabaseConnectionException, NotFoundException } from '../../errors';

describe('Shop Service', () => {
  let shopService: ShopService;
  let shopRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        LoggerService,
        {
          provide: ShopRepository,
          useFactory: mockShopRepository,
        },
      ],
    }).compile();
    shopService = module.get<ShopService>(ShopService);
    shopRepository = module.get<ShopRepository>(ShopRepository);
  });

  it('ShopService should be defined', () => {
    expect(ShopService).toBeDefined();
  });

  describe('getProducts', () => {
    it('Providing Valid Data for all product', async () => {
      shopRepository.getByFields.mockReturnValue([productOutput]);
      const product = await shopService.getProducts(
        pageExample,
        limitExample,
        orderExample,
        fieldExample,
      );
      expect(product).toEqual({ products: [productOutput] });
    });

    it('Providing Invalid should return DatabaseConnectionException', async () => {
      shopRepository.getByFields.mockReturnValue([]);
      try {
        await shopService.getProducts(
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
      shopRepository.getById.mockReturnValue(productOutput);
      const product = await shopService.getProduct(productOutput.id);
      expect(product).toEqual({ product: productOutput });
    });

    it('Providing Invalid should return DatabaseConnectionException', async () => {
      shopRepository.getById.mockReturnValue(null);
      try {
        await shopService.getProduct(productOutput.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
