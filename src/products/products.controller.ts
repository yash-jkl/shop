import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Get,
  Query,
  Param,
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
import { Serialize } from '../utils/loaders/SerializeDto';
import { AdminHeaderReqDto } from '../admin/dto';
import {
  ProductCreateReqDto,
  ProductsAllResDto,
  ProductGetAllLimitReqDto,
  ProductGetAllPageReqDto,
  ProductGetAllSortOrderReqDto,
  ProductGetAllFieldReqDto,
} from './dto';
import { ProductResDto } from './dto/response/get-product.dto';

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
  @ApiBearerAuth()
  @HttpCode(HttpStatus.FOUND)
  @Get()
  async getProducts(
    @Headers('user') admin: AdminHeaderReqDto,
    @Query('page') page: ProductGetAllPageReqDto,
    @Query('limit') limit: ProductGetAllLimitReqDto,
    @Query('sortOrder') sortOrder: ProductGetAllSortOrderReqDto,
    @Query('sortField') sortField: ProductGetAllFieldReqDto,
  ) {
    return this.productsService.getProducts(
      admin,
      page,
      limit,
      sortOrder,
      sortField,
    );
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
  @ApiBearerAuth()
  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  async getProduct(
    @Headers('user') admin: AdminHeaderReqDto,
    @Param('id') id: string,
  ) {
    return this.productsService.getProduct(admin, id);
  }
}
