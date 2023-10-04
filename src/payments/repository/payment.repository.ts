import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { PaymentCheckoutType, PaymentStatus } from '../constants';

export interface IPaymentRepository {
  addPaymentData(
    paymentData: Array<PaymentCheckoutType>,
  ): Promise<PaymentEntity[]>;
  changePaymentStatus(checkoutId: string, status: PaymentStatus): Promise<void>;
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
    for (const data of paymentData) {
      const payment = this.paymentEntity.create(data);
      paymentsToInsert.push(payment);
    }
    return await this.paymentEntity.save(paymentsToInsert);
  }

  async changePaymentStatus(
    checkoutId: string,
    status: PaymentStatus,
  ): Promise<void> {
    await this.paymentEntity
      .createQueryBuilder()
      .createQueryBuilder()
      .update(PaymentEntity)
      .set({ status })
      .where('checkoutId = :checkoutId', { checkoutId })
      .execute();
  }
}
