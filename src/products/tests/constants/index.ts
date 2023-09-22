import {
  ProductCreateReqDto,
  ProductGetAllFieldReqDto,
  ProductGetAllLimitReqDto,
  ProductGetAllPageReqDto,
  ProductGetAllSortOrderReqDto,
} from '../../dto';
import { AdminHeaderReqDto } from '../../../admin/dto';
import { UserType } from '../../../utils/token/types';
import { AdminEntity } from '../../../admin/entities';
import { ProductField, SortOrder } from '../../../utils/constants';

export const adminHeaderInput: AdminHeaderReqDto = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  userType: UserType.ADMIN,
  email: 'john@doe.com',
  iat: 1234,
  exp: 1234,
};

export const adminOutput: AdminEntity = {
  id: '929270f8-f62e-4580-8533-10d473ce520a',
  firstName: 'john',
  lastName: 'doe',
  email: 'john@doe.com',
  password: '$2b$10$4Dz7cd/nTzDm2Dm2vRbYs.SQUtRrV2pE/Z7L82XataOOJklLPiM.2',
  createdAt: new Date('2023-09-13T01:41:57.449Z'),
  updatedAt: new Date('2023-09-13T01:41:57.449Z'),
  deletedAt: null,
  products: [],
  generateId: function (): void {
    throw new Error('Function not implemented.');
  },
  hasId: function (): boolean {
    throw new Error('Function not implemented.');
  },
  save: function (): Promise<AdminEntity> {
    throw new Error('Function not implemented.');
  },
  remove: function (): Promise<AdminEntity> {
    throw new Error('Function not implemented.');
  },
  softRemove: function (): Promise<AdminEntity> {
    throw new Error('Function not implemented.');
  },
  recover: function (): Promise<AdminEntity> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const createProductInput: ProductCreateReqDto = {
  title: 'anc',
  description: 'A very nice book',
  price: 250,
  isAvailable: true,
  admin: adminOutput,
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

export const limitExample: ProductGetAllLimitReqDto = {
  limit: '1',
};

export const pageExample: ProductGetAllPageReqDto = {
  page: '1',
};

export const orderExample: ProductGetAllSortOrderReqDto = {
  sortOrder: SortOrder.Ascending,
};

export const fieldExample: ProductGetAllFieldReqDto = {
  sortField: ProductField.title,
};
