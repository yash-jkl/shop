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
    if (!product?.id) throw new NotFoundException();
    this.logger.info(`${ShopService.logInfo} Found Product with Id: ${data}`);
    return { product };
  }
}
