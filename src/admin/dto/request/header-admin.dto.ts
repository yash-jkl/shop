import { UserType } from '../../../utils/token/types';

export class AdminHeaderReqDto {
  id: string;
  userType: UserType.ADMIN;
  email: string;
  iat: number;
  exp: number;
}
