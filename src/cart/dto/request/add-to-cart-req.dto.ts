import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsNotBlank } from '../../../utils/decorators';

export class AddToCartReqDto {
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: '2e17ae4b-c348-4e57-8724-066860c22b43',
    maxLength: 255,
  })
  productId: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  quantity: number = 1;
}
