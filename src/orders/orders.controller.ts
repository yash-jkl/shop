import {
  Controller,
  Query,
  Headers,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import {
  OrderGetAllFieldReqDto,
  OrderGetAllLimitReqDto,
  OrderGetAllPageReqDto,
  OrderGetAllSortOrderReqDto,
  ShopAllResDto,
  UserHeaderReqDto,
} from './dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Serialize } from '../utils/loaders/SerializeDto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Serialize(ShopAllResDto)
  @ApiResponse({
    description: 'for more information please check ProductCreateReqDto schema',
  })
  @ApiOkResponse({
    description: 'Retrived Products successfully',
    type: ShopAllResDto,
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'Not Found error',
    status: 500,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.FOUND)
  @Get()
  async getProducts(
    @Headers('user') user: UserHeaderReqDto,
    @Query('page') page: OrderGetAllPageReqDto,
    @Query('limit') limit: OrderGetAllLimitReqDto,
    @Query('sortOrder') sortOrder: OrderGetAllSortOrderReqDto,
    @Query('sortField') sortField: OrderGetAllFieldReqDto,
  ) {
    return this.ordersService.getOrders(
      user,
      +page,
      +limit,
      sortOrder,
      sortField,
    );
  }
}
