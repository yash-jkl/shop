import { Body, Controller, HttpCode, HttpStatus, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../utils/decorators/auth.decorator';
import { AuthType } from '../utils/token/types';
import { OrdersService } from './services/orders.service';


@ApiTags('orders')
@Auth(AuthType.None)
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @Post('/payments')
    @HttpCode(HttpStatus.OK)
    async payments(@Req() req: RawBodyRequest<Request>, @Body() event: any){
        const signature = req.headers['stripe-signature'];
        return this.ordersService.payment(event, signature)
    }
}
