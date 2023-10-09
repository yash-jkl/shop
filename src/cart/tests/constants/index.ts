import { AddToCartReqDto, UserHeaderReqDto } from '../../dto';
import { UserType } from '../../../utils/token/types';

export const userHeaderInput: UserHeaderReqDto = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  userType: UserType.USER,
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};

export const mockItemInput: AddToCartReqDto = {
  productId: '929270f8-f62e-4580-8533-10d473ce520a',
  quantity: 2,
};
