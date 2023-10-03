import {
  Headers,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../utils/decorators/auth.decorator';
import { AuthType } from '../utils/token/types';
import { PaymentService } from './services/payment.service';
import { UserHeaderReqDto, checkCartResDto } from './dto';
import { Serialize } from '../utils/loaders/SerializeDto';

@ApiTags('payment')
// @Auth(AuthType.None)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

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
    return this.paymentService.checkout(user);
  }

  @Auth(AuthType.None)
  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  async payments(@Req() req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'];
    const event = req.rawBody;
    return this.paymentService.verify(event, signature);
  }
}
