import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { productExample } from '../../constants';

productExample.createdAt = '2023-09-20T06:31:18.061Z';
productExample.updatedAt = '2023-09-20T06:31:18.061Z';
const example = [productExample];

class Product {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsBoolean()
  isAvailable: boolean;

  @Expose()
  @IsDateString()
  createdAt: string;
  @Expose()
  @IsDateString()
  updatedAt: string;
}

export class ProductResDto {
  @Expose()
  @ApiProperty({ type: Product, example })
  @Type(() => Product)
  product: Product;
}
