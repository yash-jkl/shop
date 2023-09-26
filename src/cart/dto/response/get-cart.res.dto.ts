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

export class getProduct {
  @Expose()
  @ApiProperty({ type: Product })
  @Type(() => Product)
  product: Product;

  @Expose()
  @ApiProperty({
    example: 1,
  })
  quantity: number;
}

export class getCartResDto {
  @Expose()
  @ApiProperty({ type: [getProduct], example: data })
  @Type(() => getProduct)
  cartItems: Array<getProduct>;

  @Expose()
  @ApiProperty({ example: 2 })
  totalCount: number;
}
