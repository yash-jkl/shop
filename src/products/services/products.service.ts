import { Inject, Injectable } from '@nestjs/common';
import { AdminHeaderReqDto } from '../../admin/dto';
import { ProductCreateReqDto } from '../dto/request/product-create.dto';
import { ProductRepository } from '../repository/product.repository';
import { LoggerService } from '../../utils/logger/WinstonLogger';
import { DatabaseConnectionException, NotFoundException } from '../errors';
import { AdminRepository } from '../../admin/repository/admin.repository';
import {
  ProductGetAllFieldReqDto,
  ProductGetAllLimitReqDto,
  ProductGetAllPageReqDto,
  ProductGetAllSortOrderReqDto,
} from '../dto';
import { ProductEntity } from '../entities';

export interface IProductsService {
  createProduct(
    admin: AdminHeaderReqDto,
    data: ProductCreateReqDto,
  ): Promise<boolean> | Error;
  getProducts(
    admin: AdminHeaderReqDto,
    page: ProductGetAllPageReqDto,
    limit: ProductGetAllLimitReqDto,
    order: ProductGetAllSortOrderReqDto,
    field: ProductGetAllFieldReqDto,
  ): Promise<{ products: ProductEntity[] }> | Error;

  getProduct(
    admin: AdminHeaderReqDto,
    data: string,
  ): Promise<{ product: ProductEntity }> | Error;
}

@Injectable()
export class ProductsService implements IProductsService {
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
    try {
      data.admin = await this.adminRepository.getById(admin.id);
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
    page: ProductGetAllPageReqDto,
    limit: ProductGetAllLimitReqDto,
    order: ProductGetAllSortOrderReqDto,
    field: ProductGetAllFieldReqDto,
  ) {
    this.logger.info(
      `${ProductsService.logInfo} Getting Products for admin with Id: ${admin.id}`,
    );
    const skip = (+page - 1) * +limit;
    try {
      const products = await this.productRepository.getByAdmin(
        admin.id,
        +limit,
        skip,
        order,
        field,
      );
      if (!products.length) {
        this.logger.warn(
          `${ProductsService.logInfo} failed to find products for adminId: ${admin.id}`,
        );
        throw new NotFoundException();
      }
      this.logger.info(
        `${ProductsService.logInfo} Found Products for admin with Id: ${admin.id}`,
      );
      return { products };
    } catch (error) {
      this.logger.error(
        `${ProductsService.logInfo} failed to find products for adminId: ${admin.id}`,
        error.stack,
      );
      throw new DatabaseConnectionException();
    }
  }

  async getProduct(admin: AdminHeaderReqDto, data: string) {
    this.logger.info(
      `${ProductsService.logInfo} Getting Product with Id: ${data}`,
    );
    const product = await this.productRepository.getById(admin.id, data);
    if (!product?.id) {
      this.logger.warn(
        `${ProductsService.logInfo} failed to find product for adminId: ${admin.id} and productid: ${data}`,
      );
      throw new NotFoundException();
    }
    this.logger.info(
      `${ProductsService.logInfo} Found Product with Id: ${data}`,
    );
    return { product };
  }
}
