import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../utils/logger/winstonLogger';
import {
  ShopGetAllFieldReqDto,
  ShopGetAllLimitReqDto,
  ShopGetAllPageReqDto,
  ShopGetAllSortOrderReqDto,
} from '../dto';
import { ShopRepository } from '../repository/shop.repository';
import { DatabaseConnectionException, NotFoundException } from '../errors';
import { ProductEntity } from '../../products/entities';

export interface IShopService {
  getProducts(
    page: ShopGetAllPageReqDto,
    limit: ShopGetAllLimitReqDto,
    order: ShopGetAllSortOrderReqDto,
    field: ShopGetAllFieldReqDto,
  ): Promise<{ products: ProductEntity[] }> | Error;

  getProduct(data: string): Promise<{ product: ProductEntity }> | Error;
}

@Injectable()
export class ShopService {
  constructor(
    @Inject(ShopRepository)
    private readonly shopRepository: ShopRepository,

    private readonly logger: LoggerService,
  ) {}

  static logInfo = 'Service - Shop:';

  async getProducts(
    page: ShopGetAllPageReqDto,
    limit: ShopGetAllLimitReqDto,
    order: ShopGetAllSortOrderReqDto,
    field: ShopGetAllFieldReqDto,
  ) {
    this.logger.info(`${ShopService.logInfo} Getting Products`);
    const skip = (+page - 1) * +limit;
    try {
      const products = await this.shopRepository.getByFields(
        +limit,
        skip,
        order,
        field,
      );
      if (!products.length) {
        this.logger.warn(`${ShopService.logInfo} failed to find products`);
        throw new NotFoundException();
      }
      this.logger.info(`${ShopService.logInfo} Found Products `);
      return { products };
    } catch (error) {
      this.logger.error(
        `${ShopService.logInfo} failed to find products`,
        error.stack,
      );
      throw new DatabaseConnectionException();
    }
  }

  async getProduct(data: string) {
    this.logger.info(`${ShopService.logInfo} Getting Product with Id: ${data}`);
    const product = await this.shopRepository.getById(data);
    if (!product?.id) {
      this.logger.warn(
        `${ShopService.logInfo} failed to find product for productid: ${data}`,
      );
      throw new NotFoundException();
    }
    this.logger.info(`${ShopService.logInfo} Found Product with Id: ${data}`);
    return { product };
  }
}
