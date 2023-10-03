import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { PaymentCheckoutType } from '../constants';

export interface IPaymentRepository {
  addPaymentData(
    paymentData: Array<PaymentCheckoutType>,
  ): Promise<PaymentEntity[]>;
}

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentEntity: Repository<PaymentEntity>,
  ) {}

  async addPaymentData(
    paymentData: Array<PaymentCheckoutType>,
  ): Promise<PaymentEntity[]> {
    const paymentsToInsert: PaymentEntity[] = [];
    console.log(paymentData);
    for (const data of paymentData) {
      const payment = this.paymentEntity.create(data);
      paymentsToInsert.push(payment);
    }
    return await this.paymentEntity.save(paymentsToInsert);
  }
}
