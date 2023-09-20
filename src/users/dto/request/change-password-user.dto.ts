import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from '../../../utils/decorators';

export class UserPasswordReqDto {
  @IsString()
  @MaxLength(100)
  @IsNotBlank()
  @ApiProperty({
    example: '123456',
    required: false,
  })
  oldPassword: string;


  @IsString()
  @MaxLength(100)
  @IsNotBlank()
  @ApiProperty({
    example: '123456',
    required: false,
  })
  newPassword: string;
}
