import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Get,
  Query,
} from '@nestjs/common';
import { Auth } from '../utils/decorators/auth.decorator';
import { AuthType } from '../utils/token/types';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './services/products.service';
import { Serialize } from 'src/utils/loaders/SerializeDto';
import { AdminHeaderReqDto } from 'src/admin/dto';
import {
  ProductCreateReqDto,
  ProductsResDto,
  ProductGetLimitReqDto,
  ProductGetPageReqDto,
  ProductGetSortOrderReqDto,
  ProductGetFieldReqDto,
} from './dto';

@ApiTags('Product')
@Auth(AuthType.AdminBearer)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Serialize()
  @ApiResponse({
    description: 'for more information please check ProductCreateReqDto schema',
  })
  @ApiOkResponse({
    description: 'When Product creation is  successfully',
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'database error',
    status: 500,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('/create-product')
  async createProduct(
    @Headers('user') admin: AdminHeaderReqDto,
    @Body() body: ProductCreateReqDto,
  ) {
    return this.productsService.createProduct(admin, body);
  }

  @Serialize(ProductsResDto)
  @ApiResponse({
    description: 'for more information please check ProductCreateReqDto schema',
  })
  @ApiOkResponse({
    description: 'Retrived Products successfully',
    type: ProductsResDto,
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'database error',
    status: 500,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.FOUND)
  @Get()
  async getProduct(
    @Headers('user') admin: AdminHeaderReqDto,
    @Query('page') page: ProductGetPageReqDto,
    @Query('limit') limit: ProductGetLimitReqDto,
    @Query('sortOrder') sortOrder: ProductGetSortOrderReqDto,
    @Query('sortField') sortField: ProductGetFieldReqDto,
  ) {
    return this.productsService.getProducts(
      admin,
      page,
      limit,
      sortOrder,
      sortField,
    );
  }
}
