import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/utils/payments/payments.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly paymentsService: PaymentsService
    ){}


    async payment(event, signature){
        // console.log(event.data.object)
       this.paymentsService.verifyPayment(event, signature)
    }
}
