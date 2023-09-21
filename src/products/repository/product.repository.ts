import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities';
import { Repository } from 'typeorm/repository/Repository';
import { ProductCreateReqDto } from '../dto';
import { UpdateResult } from 'typeorm';

export interface IProductRepository {
  save(productEntity: ProductEntity): Promise<ProductEntity>;
  getById(id: string): Promise<ProductEntity | undefined>;
  updateUser(data: ProductEntity): Promise<UpdateResult>;
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

  async getById(id: string): Promise<ProductEntity> {
    return await this.productEntity.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async updateUser(data: ProductEntity): Promise<UpdateResult> {
    return await this.productEntity.update(
      {
        id: data.id,
      },
      {
        ...data,
      },
    );
  }
}
