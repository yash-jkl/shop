import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../services/shop.service';
import { mockShopService } from '../mocks';
import { ShopController } from '../../shop.controller';
import { productId, productOutput } from '../constants';
import { NotFoundException } from '../../errors';
import { ProductField, SortOrder } from '../../../utils/constants';

describe('Shop Controller', () => {
  let shopService;
  let shopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopController,
        {
          provide: ShopService,
          useFactory: mockShopService,
        },
      ],
    }).compile();
    shopService = module.get<ShopService>(ShopService);
    shopController = module.get<ShopController>(ShopController);
  });
  it('Shop Controller should be defined', () => {
    expect(shopController).toBeDefined();
  });

  describe('Get Products', () => {
    it('Valid id should return valid response', async () => {
      shopService.getProducts.mockReturnValue({ products: [productOutput] });
      const products = await shopController.getProducts(
        '1',
        '1',
        SortOrder.Ascending,
        ProductField.title,
      );
      expect(products).toEqual({ products: [productOutput] });
    });
    it('Invalid fields should throw Not Found Exception', async () => {
      try {
        shopService.getProducts.mockRejectedValue(new NotFoundException());
        await shopController.getProduct(productId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Get Product', () => {
    it('Valid id should return valid response', async () => {
      shopService.getProduct.mockReturnValue({ product: productOutput });
      const product = await shopController.getProduct(productId);
      expect(product).toEqual({ product: productOutput });
    });
    it('Invalid id should throw Not Found Exception', async () => {
      try {
        shopService.getProduct.mockRejectedValue(new NotFoundException());
        await shopController.getProduct(productId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
