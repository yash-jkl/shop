import { Test, TestingModule } from '@nestjs/testing';
import { CartRepository } from '../../repository/cart.repository';
import { CartService } from '../../services/cart.service';
import { LoggerService } from '../../../utils/logger/WinstonLogger';
import { mockCartRepository } from '../mocks';
import { Helper } from '../../helper/helper';
import {
  mockCartItems,
  mockGetCartOutput,
  mockItemInput,
  userHeaderInput,
} from '../constants';
import {
  DatabaseConnectionException,
  NotFoundException,
} from '../../../cart/errors';

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

    it('should throw database exception when faced with error from databse', async () => {
      cartRepository.addItem.mockRejectedValue(DatabaseConnectionException);
      try {
        await cartService.addToCart(userHeaderInput, mockItemInput);
      } catch (error) {
        expect(error).toBeInstanceOf(DatabaseConnectionException);
      }
    });
  });

  describe('removeItemFromCart', () => {
    it('cartRepository.removeItemFromCart should be called for valid data and function return type is undefined', async () => {
      cartRepository.removeItemFromCart.mockReturnValue();
      const data = await cartService.removeItemFromCart(
        userHeaderInput,
        mockItemInput,
      );
      expect(cartRepository.removeItemFromCart).toBeCalled();
      expect(data).toBe(undefined);
    });

    it('should throw NotFoundException exception when faced with error from databse', async () => {
      cartRepository.removeItemFromCart.mockRejectedValue(NotFoundException);
      try {
        await cartService.removeItemFromCart(userHeaderInput, mockItemInput);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteCart', () => {
    it('cartRepository.deleteCart should be called for valid data and function return type is undefined', async () => {
      cartRepository.deleteCartItems.mockReturnValue();
      const data = await cartService.deleteCart(userHeaderInput);
      expect(cartRepository.deleteCartItems).toBeCalled();
      expect(data).toBe(undefined);
    });

    it('should throw NotFoundException exception when faced with error from databse', async () => {
      cartRepository.deleteCartItems.mockRejectedValue(NotFoundException);
      try {
        await cartService.deleteCart(userHeaderInput);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getCart', () => {
    it('cartRepository.getCart should be called for valid data and function return cart with total', async () => {
      cartRepository.getCart.mockReturnValue(mockCartItems);
      const data = await cartService.getCart(userHeaderInput);
      expect(cartRepository.getCart).toBeCalled();
      expect(data).toEqual(mockGetCartOutput);
    });

    it('should throw NotFoundException exception when faced with error from databse', async () => {
      cartRepository.getCart.mockRejectedValue(NotFoundException);
      try {
        await cartService.getCart(userHeaderInput);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
