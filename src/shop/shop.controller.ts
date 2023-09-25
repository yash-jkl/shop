import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ShopService } from './services/shop.service';
import { Serialize } from '../utils/loaders/SerializeDto';
import {
  ProductsAllResDto,
  ShopGetAllFieldReqDto,
  ShopGetAllLimitReqDto,
  ShopGetAllPageReqDto,
  ShopGetAllSortOrderReqDto,
} from './dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../utils/decorators/auth.decorator';
import { AuthType } from '../utils/token/types';
import { ProductResDto } from './dto/response/get-product.dto';

@ApiTags('Shop')
@Auth(AuthType.None)
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Serialize(ProductsAllResDto)
  @ApiResponse({
    description: 'for more information please check ProductCreateReqDto schema',
  })
  @ApiOkResponse({
    description: 'Retrived Products successfully',
    type: ProductsAllResDto,
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'database error',
    status: 500,
  })
  @HttpCode(HttpStatus.FOUND)
  @Get()
  async getProducts(
    @Query('page') page: ShopGetAllPageReqDto,
    @Query('limit') limit: ShopGetAllLimitReqDto,
    @Query('sortOrder') sortOrder: ShopGetAllSortOrderReqDto,
    @Query('sortField') sortField: ShopGetAllFieldReqDto,
  ) {
    return this.shopService.getProducts(page, limit, sortOrder, sortField);
  }

  @Serialize(ProductResDto)
  @ApiResponse({
    description: 'for more information please check ProductCreateReqDto schema',
  })
  @ApiOkResponse({
    description: 'Retrived Product successfully',
    type: ProductResDto,
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'database error',
    status: 500,
  })
  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.shopService.getProduct(id);
  }
}
