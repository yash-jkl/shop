import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from '../../../utils/decorators';

export class ProductGetReqDto {
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: '2e17ae4b-c348-4e57-8724-066860c22b43',
    maxLength: 255,
  })
  id: string;
}
