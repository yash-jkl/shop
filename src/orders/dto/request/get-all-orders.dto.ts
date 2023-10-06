import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '../../../utils/constants';
import { SortField } from '../../constants';

export class OrderGetAllSortOrderReqDto {
  @ApiProperty({
    enum: ['ASC', 'DESC'],
    default: SortOrder.Descending,
    example: SortOrder.Descending,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder: SortOrder;
}

export class OrderGetAllPageReqDto {
  @ApiProperty({
    example: '1',
    default: '1',
  })
  @IsNumberString()
  @IsOptional()
  page: string;
}

export class OrderGetAllLimitReqDto {
  @ApiProperty({
    example: '10',
    default: '10',
  })
  @IsNumberString()
  @IsOptional()
  limit: string;
}

export class OrderGetAllFieldReqDto {
  @ApiProperty({
    enum: SortField,
    default: SortField.createdAt,
    example: SortField.createdAt,
  })
  @IsEnum(SortField)
  @IsOptional()
  sortField: SortField;
}
