import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/utils/decorators/auth.decorator';
import { AuthType } from 'src/utils/token/types';
import { CartService } from './services/cart.service';
import { Serialize } from 'src/utils/loaders/SerializeDto';
import {
  AddToCartReqDto,
  UserHeaderReqDto,
  checkCartResDto,
  getFinalCartResDto,
} from './dto';

@ApiTags('Cart')
@Auth(AuthType.UserBearer)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Serialize()
  @ApiResponse({
    description: 'for more information please check AddToCartReqDto schema',
  })
  @ApiOkResponse({
    description: 'When Product added to cart successfully',
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'database error',
    status: 500,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('/add-to-cart')
  async addToCart(
    @Headers('user') user: UserHeaderReqDto,
    @Body() body: AddToCartReqDto,
  ) {
    return this.cartService.addToCart(user, body);
  }

  @Serialize()
  @ApiResponse({
    description: 'for more information please check AddToCartReqDto schema',
  })
  @ApiOkResponse({
    description: 'When Item removed from cart successfully',
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'Not Found Exception',
    status: 404,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/remove-from-cart')
  async removeFromCart(
    @Headers('user') user: UserHeaderReqDto,
    @Body() body: AddToCartReqDto,
  ) {
    return this.cartService.removeItemFromCart(user, body);
  }

  @Serialize()
  @ApiOkResponse({
    description: 'When cart removed successfully',
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'Not Found Exception',
    status: 404,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Delete('')
  async deleteCart(@Headers('user') user: UserHeaderReqDto) {
    return this.cartService.deleteCart(user);
  }

  @Serialize(getFinalCartResDto)
  @ApiOkResponse({
    description: 'When cart removed successfully',
    status: 201,
    type: getFinalCartResDto,
  })
  @ApiBadRequestResponse({
    description: 'Not Found Exception',
    status: 404,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('')
  async final(@Headers('user') user: UserHeaderReqDto) {
    return this.cartService.getCart(user);
  }

  @Serialize(checkCartResDto)
  @ApiOkResponse({
    description: 'When cart removed successfully',
    status: 201,
    type: checkCartResDto,
  })
  @ApiBadRequestResponse({
    description: 'Not Found Exception',
    status: 404,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('checkout')
  async checkout(@Headers('user') user: UserHeaderReqDto) {
    return this.cartService.checkout(user);
  }
}
