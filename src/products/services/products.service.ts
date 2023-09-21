import { Inject, Injectable } from '@nestjs/common';
import { AdminHeaderReqDto } from '../../admin/dto';
import { ProductCreateReqDto } from '../dto/request/product-create.dto';
import { ProductRepository } from '../repository/product.repository';
import { LoggerService } from '../../utils/logger/winstonLogger';
import { DatabaseConnectionException } from '../errors';
import { AdminRepository } from '../../admin/repository/admin.repository';
import {
  ProductGetFieldReqDto,
  ProductGetLimitReqDto,
  ProductGetPageReqDto,
  ProductGetSortOrderReqDto,
} from '../dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,

    @Inject(AdminRepository)
    private readonly adminRepository: AdminRepository,

    private readonly logger: LoggerService,
  ) {}

  static logInfo = 'Service - Product:';

  async createProduct(admin: AdminHeaderReqDto, data: ProductCreateReqDto) {
    this.logger.info(
      `${ProductsService.logInfo} Create Product with name: ${data.title}`,
    );
    data.admin = await this.adminRepository.getById(admin.id);
    try {
      await this.productRepository.save(data);
      this.logger.info(
        `${ProductsService.logInfo} Created Product with name: ${data.title}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `${ProductsService.logInfo} failed to create product with name: ${data.title}`,
        error.stack,
      );
      throw new DatabaseConnectionException();
    }
  }

  async getProducts(
    admin: AdminHeaderReqDto,
    page: ProductGetPageReqDto,
    limit: ProductGetLimitReqDto,
    order: ProductGetSortOrderReqDto,
    field: ProductGetFieldReqDto,
  ) {
    this.logger.info(
      `${ProductsService.logInfo} Getting Products for admin with Id: ${admin.id}`,
    );
    const skip = (+page - 1) * +limit;
    this.logger.info(
      `${ProductsService.logInfo} Found Products for admin with Id: ${admin.id}`,
    );
    try {
      return {
        products: await this.productRepository.getByAdmin(
          admin.id,
          +limit,
          skip,
          order,
          field,
        ),
      };
    } catch (error) {
      this.logger.error(
        `${ProductsService.logInfo} failed to find products for adminId: ${admin.id}`,
        error.stack,
      );
      throw new DatabaseConnectionException();
    }
  }
}
