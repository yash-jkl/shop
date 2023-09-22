import { UserType } from '../../../utils/token/types';

export class UserHeaderReqDto {
  id: string;
  userType: UserType.USER;
  email: string;
  iat: number;
  exp: number;
}
