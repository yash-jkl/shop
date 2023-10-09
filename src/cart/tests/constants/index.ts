import { AddToCartReqDto, UserHeaderReqDto } from '../../dto';
import { UserType } from '../../../utils/token/types';

export const userHeaderInput: UserHeaderReqDto = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  userType: UserType.USER,
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};

export const userHeaderInvalidInput = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};

export const mockItemInput: AddToCartReqDto = {
  productId: '929270f8-f62e-4580-8533-10d473ce520a',
  quantity: 2,
};

export const mockItemInvalidInput = {
  productId: 123,
  quantity: 2,
};

export const mockCartItems = {
  cartItems: [
    {
      product: {
        id: '2c209f39-146a-4a1c-9f95-62d072eb7cb2',
        title: 'Pen',
        price: 300,
        isAvailable: true,
      },
      quantity: 2,
      amount: 600,
    },
  ],
  totalCount: 1,
};

export const mockGetCartOutput = {
  items: mockCartItems.cartItems,
  total: 600,
  totalItems: mockCartItems.totalCount,
};
