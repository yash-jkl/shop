import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from '../../../utils/decorators';
import { AdminEntity } from '../../../admin/entities';

export class ProductCreateReqDto {
  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'book',
    maxLength: 255,
  })
  title: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'A very nice book',
    maxLength: 255,
    required: false,
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 250,
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
    required: false,
  })
  isAvailable: boolean;

  admin: AdminEntity;
}
