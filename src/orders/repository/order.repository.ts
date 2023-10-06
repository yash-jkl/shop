import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { OrderGetAllSortOrderReqDto, OrderGetAllFieldReqDto } from '../dto';

export interface IOrderRepository {
  save(ordersData): Promise<void>;
  getByUserId(
    userId: string,
    skip: number,
    limit: number,
    sortOrderDto: OrderGetAllSortOrderReqDto,
    sortField: OrderGetAllFieldReqDto,
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
    sortOrderDto: OrderGetAllSortOrderReqDto,
    sortField: OrderGetAllFieldReqDto,
  ): Promise<[OrderEntity[], number] | undefined> {
    const sortOrder: any = sortOrderDto;
    const [data, count] = await this.orderEntity
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoin('order.user', 'user')
      .where('user.id = :userId', { userId })
      .orderBy(`order.${sortField}`, sortOrder)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return [data, count];
  }
}
