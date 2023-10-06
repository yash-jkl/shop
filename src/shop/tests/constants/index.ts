import {
  ShopGetAllFieldReqDto,
  ShopGetAllLimitReqDto,
  ShopGetAllPageReqDto,
  ShopGetAllSortOrderReqDto,
} from '../../dto';
import { AdminHeaderReqDto } from '../../../admin/dto';
import { UserType } from '../../../utils/token/types';
import { ProductField, SortOrder } from '../../../utils/constants';

export const adminHeaderInput: AdminHeaderReqDto = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  userType: UserType.ADMIN,
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};

export const productOutput = {
  id: 'fed11131-e9b8-420b-8cf2-d6c4cf93ba22',
  title: 'anc',
  description: 'A very nice book',
  price: 250,
  isAvailable: true,
  createdAt: '2023-09-13T01:41:57.449Z',
  updatedAt: '2023-09-13T01:41:57.449Z',
  deletedAt: null,
};

export const productId = {
  id: 'fed11131-e9b8-420b-8cf2-d6c4cf93ba22',
};

export const limitExample: ShopGetAllLimitReqDto = {
  limit: '1',
};

export const pageExample: ShopGetAllPageReqDto = {
  page: '1',
};

export const orderExample: ShopGetAllSortOrderReqDto = {
  sortOrder: SortOrder.Ascending,
};

export const fieldExample: ShopGetAllFieldReqDto = {
  sortField: ProductField.title,
};
