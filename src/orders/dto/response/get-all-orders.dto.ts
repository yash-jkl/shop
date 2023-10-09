import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { orderExample } from '../../../utils/constants';

const example = [orderExample];
export class Product {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  title: string;
}

export class Order {
  @Expose()
  productPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  createdAt: number;

  @Expose()
  @ApiProperty({ type: Product })
  @Type(() => Product)
  product: Product;
}

export class OrderAllResDto {
  @Expose()
  @ApiProperty({ type: [Order], example })
  @Type(() => Order)
  orders: Array<Order>;

  @Expose()
  @ApiProperty({ example: 1 })
  total: number;
}
