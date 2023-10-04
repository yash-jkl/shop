import { Injectable } from '@nestjs/common';
import { verifyPayment } from '../constants';

export interface IPayments {
  createCheckOutSession(id: string, user: any, items: any[]): Promise<any>;
  verifyPayment(data: Buffer, signature: any): verifyPayment;
}

@Injectable()
export abstract class PaymentsService implements IPayments {
  abstract createCheckOutSession(
    id: string,
    user: any,
    items: any[],
  ): Promise<any>;
  abstract verifyPayment(data: Buffer, signature: any): verifyPayment;
}
