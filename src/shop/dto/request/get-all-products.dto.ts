import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '../../../utils/constants';
import { ProductField } from '../../../utils/constants';

export class ShopGetAllSortOrderReqDto {
  @ApiProperty({
    enum: ['ASC', 'DESC'],
    default: SortOrder.Ascending,
    example: SortOrder.Ascending,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder: SortOrder;
}

export class ShopGetAllPageReqDto {
  @ApiProperty({
    example: '1',
    default: '1',
  })
  @IsNumberString()
  @IsOptional()
  page: string;
}

export class ShopGetAllLimitReqDto {
  @ApiProperty({
    example: '10',
    default: '10',
  })
  @IsNumberString()
  @IsOptional()
  limit: string;
}

export class ShopGetAllFieldReqDto {
  @ApiProperty({
    enum: ProductField,
    default: ProductField.title,
    example: ProductField.title,
  })
  @IsEnum(ProductField)
  @IsOptional()
  sortField: ProductField;
}
