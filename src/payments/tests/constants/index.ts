import { UserHeaderReqDto } from '../../dto';
import { UserType } from '../../../utils/token/types';

export const userHeaderInput: UserHeaderReqDto = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  userType: UserType.USER,
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};

export const mockCheckoutOutput = {
  product: {
    id: '929270f8-f62e-4580-8533-10d473ce520a',
    title: 'Book',
    price: 250,
    admin: {
      id: '929270f8-f62e-4580-8533-10d473ce520a',
    },
  },
  quantity: 2,
};
export const url = 'http://google.com';
export const mockurl = {
  url,
};
