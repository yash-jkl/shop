import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';

export interface IOrderRepository {
  save(ordersData): Promise<void>;
  getByUserId(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<[OrderEntity[], number] | undefined>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
  ) {}

  async save(orderData): Promise<void> {
    const order = this.orderEntity.create(orderData);
    await this.orderEntity.save(order);
  }

  async getByUserId(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<[OrderEntity[], number] | undefined> {
    const [data, count] = await this.orderEntity
      .createQueryBuilder('order')
      .where('user.id = :userId', { userId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return [data, count];
  }
}
