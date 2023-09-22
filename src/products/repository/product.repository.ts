import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import {
  ProductCreateReqDto,
  ProductGetAllFieldReqDto,
  ProductGetAllSortOrderReqDto,
} from '../dto';
import { UpdateResult } from 'typeorm';

export interface IProductRepository {
  save(productEntity: ProductEntity): Promise<ProductEntity>;
  getById(adminId: string, id: string): Promise<ProductEntity | undefined>;
  updateProduct(data: ProductEntity): Promise<UpdateResult>;
  getByAdmin(
    adminId: string,
    limit: number,
    skip: number,
    sortOrderDto: ProductGetAllSortOrderReqDto,
    sortField: ProductGetAllFieldReqDto,
  ): Promise<ProductEntity[]>;
}

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  async save(data: ProductCreateReqDto): Promise<ProductEntity> {
    const product = this.productEntity.create(data);
    return await this.productEntity.save(product);
  }

  async getById(adminId: string, id: string): Promise<ProductEntity> {
    return await this.productEntity
      .createQueryBuilder('product')
      .innerJoin('product.admin', 'admin')
      .where('product.id = :id', { id })
      .andWhere('admin.id = :adminId', { adminId })
      .getOne();
  }

  async updateProduct(data: ProductEntity): Promise<UpdateResult> {
    return await this.productEntity.update(
      {
        id: data.id,
      },
      {
        ...data,
      },
    );
  }

  async getByAdmin(
    adminId: string,
    limit: number,
    skip: number,
    sortOrderDto: ProductGetAllSortOrderReqDto,
    sortField: ProductGetAllFieldReqDto,
  ): Promise<ProductEntity[]> {
    const sortOrder: any = sortOrderDto;
    return await this.productEntity
      .createQueryBuilder('product')
      .innerJoin('product.admin', 'admin')
      .where('admin.id = :adminId', { adminId })
      .orderBy(`product.${sortField}`, sortOrder)
      .skip(skip)
      .take(limit)
      .getMany();
  }
}
