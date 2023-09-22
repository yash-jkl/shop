import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID, IsString, IsNumber, IsBoolean } from 'class-validator';
import { productExample } from '../../constants';

delete productExample.description;

const example = [productExample];
export class Product {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsBoolean()
  isAvailable: boolean;
}

export class ProductsAllResDto {
  @Expose()
  @ApiProperty({ type: [Product], example })
  @Type(() => Product)
  products: Array<Product>;
}
