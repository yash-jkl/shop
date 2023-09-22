import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../products/entities';
import { Repository } from 'typeorm/repository/Repository';
import { ShopGetAllFieldReqDto, ShopGetAllSortOrderReqDto } from '../dto';

export interface IShopRepository {
  getById(id: string): Promise<ProductEntity | undefined>;
  getByFields(
    limit: number,
    skip: number,
    sortOrderDto: ShopGetAllSortOrderReqDto,
    sortField: ShopGetAllFieldReqDto,
  ): Promise<ProductEntity[] | undefined>;
}

@Injectable()
export class ShopRepository implements IShopRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  async getById(id: string): Promise<ProductEntity> {
    return await this.productEntity
      .createQueryBuilder('product')
      .innerJoin('product.admin', 'admin')
      .where('product.id = :id', { id })
      .getOne();
  }

  async getByFields(
    limit: number,
    skip: number,
    sortOrderDto: ShopGetAllSortOrderReqDto,
    sortField: ShopGetAllFieldReqDto,
  ): Promise<ProductEntity[] | undefined> {
    const sortOrder: any = sortOrderDto;
    return await this.productEntity
      .createQueryBuilder('product')
      .innerJoin('product.admin', 'admin')
      .orderBy(`product.${sortField}`, sortOrder)
      .skip(skip)
      .take(limit)
      .getMany();
  }
}
