import { TestingModule, Test } from '@nestjs/testing';
import {
  mockCartItems,
  mockItemInput,
  mockItemInvalidInput,
  userHeaderInput,
  userHeaderInvalidInput,
} from '../constants';
import { CartService } from '../../services/cart.service';
import { mockCartService } from '../mocks';
import { CartController } from '../../cart.controller';

describe('CartController', () => {
  let cartService;
  let cartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartController,
        {
          provide: CartService,
          useFactory: mockCartService,
        },
      ],
    }).compile();
    cartService = module.get<CartService>(CartService);
    cartController = module.get<CartController>(CartController);
  });

  it('CartController', () => {
    expect(CartController).toBeDefined();
  });

  describe('addToCart', () => {
    it('Valid Data should return valid Output', async () => {
      cartService.addToCart.mockReturnValue();
      const data = await cartController.addToCart(
        userHeaderInput,
        mockItemInput,
      );
      expect(data).toEqual(undefined);
      expect(cartService.addToCart).toBeCalled();
    });
    it('Invalid Data should return Refrence Error', async () => {
      try {
        await cartController.addToCart(userHeaderInput, 'abc');
      } catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(cartService.addToCart).not.toBeCalled();
      }
    });
  });

  describe('removeItemFromCart', () => {
    it('Valid Data should return valid Output', async () => {
      cartService.removeItemFromCart.mockReturnValue();
      const data = await cartController.removeFromCart(
        userHeaderInput,
        mockItemInput,
      );
      expect(data).toEqual(undefined);
      expect(cartService.removeItemFromCart).toBeCalled();
    });
    it('Invalid Data should return Type Error', async () => {
      try {
        await cartController.removeItemFromCart(
          userHeaderInput,
          mockItemInvalidInput,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(cartService.removeItemFromCart).not.toBeCalled();
      }
    });
  });

  describe('deleteCart', () => {
    it('Valid Data should return valid Output', async () => {
      cartService.deleteCart.mockReturnValue();
      const data = await cartController.deleteCart(userHeaderInput);
      expect(data).toEqual(undefined);
      expect(cartService.deleteCart).toBeCalled();
    });
    it('Invalid Data should return Refrence Error', async () => {
      try {
        await cartController.deleteCart(userHeaderInvalidInput);
      } catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(cartService.deleteCart).not.toBeCalled();
      }
    });
  });

  describe('final', () => {
    it('Valid Data should return valid Output', async () => {
      cartService.getCart.mockReturnValue(mockCartItems);
      const data = await cartController.final(userHeaderInput);
      expect(data).toEqual(mockCartItems);
      expect(cartService.getCart).toBeCalled();
    });
    it('Invalid Data should return Refrence Error', async () => {
      try {
        await cartController.final(userHeaderInvalidInput);
      } catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(cartService.getCart).not.toBeCalled();
      }
    });
  });
});
