import { Test, TestingModule } from '@nestjs/testing';
import { CartRepository } from '../../repository/cart.repository';
import { CartService } from '../../services/cart.service';
import { LoggerService } from '../../../utils/logger/winstonLogger';
import { mockCartRepository } from '../mocks';
import { Helper } from '../../helper/helper';
import { mockItemInput, userHeaderInput } from '../constants';
import { DatabaseConnectionException } from '../../../cart/errors';

describe('Cart Service', () => {
  let cartService: CartService;
  let cartRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        CartService,
        Helper,
        {
          provide: CartRepository,
          useFactory: mockCartRepository,
        },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    cartRepository = module.get<CartRepository>(CartRepository);
  });

  it('Cart Service to be defined', () => {
    expect(CartService).toBeDefined();
  });

  describe('addToCart', () => {
    it('cartRepository.addItem should be called for valid data and function return type is undefined', async () => {
      cartRepository.addItem.mockReturnValue();
      const data = await cartService.addToCart(userHeaderInput, mockItemInput);
      expect(cartRepository.addItem).toBeCalled();
      expect(data).toBe(undefined);
    });

    it('should throw database exception wen faced with error from databse', async () => {
      cartRepository.addItem.mockRejectedValue(DatabaseConnectionException);
      try {
        await cartService.addToCart(userHeaderInput, mockItemInput);
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseConnectionException);
      }
    });
  });
});
