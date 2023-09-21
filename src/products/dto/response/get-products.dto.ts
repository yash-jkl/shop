import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID, IsString, IsNumber, IsBoolean } from 'class-validator';

const example = [
  {
    id: '2e17ae4b-c348-4e57-8724-066860c22b43',
    title: 'book',
    description: 'A very nice book',
    price: 250,
    isAvailable: true,
  },
];
export class Product {
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
}

export class ProductsResDto {
  @Expose()
  @ApiProperty({ type: [Product], example })
  @Type(() => Product)
  products: Array<Product>;
}
