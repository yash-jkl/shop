import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { productExample } from '../../../utils/constants';

const data = {
  cartItems: [
    {
      product: {
        id: productExample.id,
        title: productExample.title,
        price: productExample.price,
        isAvailable: productExample.isAvailable,
      },
      quantity: 1,
      amount: 1 * productExample.price,
    },
  ],
};

export class Product {
  @Expose()
  @IsString()
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

export class getFinalProduct {
  @Expose()
  @ApiProperty({ type: Product })
  @Type(() => Product)
  product: Product;

  @Expose()
  @ApiProperty({
    example: 1,
  })
  quantity: number;

  @Expose()
  @ApiProperty({
    example: 250,
  })
  amount: number;
}

export class getFinalCartResDto {
  @Expose()
  @ApiProperty({ type: [getFinalProduct], example: data })
  @Type(() => getFinalProduct)
  items: Array<getFinalProduct>;

  @Expose()
  @ApiProperty({ example: 250 })
  total: number;

  @Expose()
  @ApiProperty({ example: 1 })
  totalItems: number;
}
