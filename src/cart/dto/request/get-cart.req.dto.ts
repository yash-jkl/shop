import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class CartGetAllPageReqDto {
  @ApiProperty({
    example: '1',
    default: '1',
  })
  @IsNumberString()
  @IsOptional()
  page: string;
}

export class CartGetAllLimitReqDto {
  @ApiProperty({
    example: '10',
    default: '10',
  })
  @IsNumberString()
  @IsOptional()
  limit: string;
}
