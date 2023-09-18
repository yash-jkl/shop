import { Injectable } from '@nestjs/common';

export interface IPayments {
  createCheckOutSession(user: any, items: any[]): Promise<any>;
  verifyPayment(data, signature): Promise<boolean>;
}

@Injectable()
export abstract class PaymentsService implements IPayments {
  abstract createCheckOutSession(user: any, items: any[]): Promise<any>;
  abstract verifyPayment(data, signature): Promise<boolean>;
}
