import {
  OrderGetAllFieldReqDto,
  OrderGetAllSortOrderReqDto,
  UserHeaderReqDto,
} from '../../dto';
import { UserType } from '../../../utils/token/types';
import { SortOrder } from '../../../utils/constants';
import { SortField } from '../../constants';

export const checkoutId = '2e17ae4b-c348-4e57-8724-066860c22b43';

export const paymentMock = {
  userId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  productId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  productTitle: 'Book',
  productPrice: 360,
  quantity: 200,
};

export const createOrderInputSuccess = {
  status: true,
  checkoutId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  amount: 6000,
  email: 'john@doe.com',
};

export const createOrderInputFailure = {
  status: false,
  checkoutId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  amount: 6000,
  email: 'john@doe.com',
};

export const getOrderrepository = {
  productPrice: 300,
  quantity: 2,
  createdAt: '2023-10-06T01:26:52.458Z',
  product: {
    title: 'Pen',
  },
};
export const total = 1;

export const userHeaderInput: UserHeaderReqDto = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  userType: UserType.USER,
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};
export const sortOrder: OrderGetAllSortOrderReqDto = {
  sortOrder: SortOrder.Descending,
};
export const sortField: OrderGetAllFieldReqDto = {
  sortField: SortField.createdAt,
};

export const getOrderOutput = {
  orders: [
    {
      id: '7f212c67-13d9-441e-8346-d8fb9851f49a',
      paymentId: '4caee7df-c991-40c1-933b-d963527d1a28',
      product: {
        title: 'Book',
      },
      productPrice: 250,
      quantity: 1,
      createdAt: '2023-10-05 05:24:09.961175',
    },
  ],
  total: 1,
};
