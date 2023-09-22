import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities';
import { LoggerModule } from '../utils/logger/logger.module';
import { ProductRepository } from './repository/product.repository';
import { AdminRepository } from '../admin/repository/admin.repository';
import { AdminEntity } from '../admin/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, AdminEntity]),
    LoggerModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, AdminRepository],
})
export class ProductsModule {}
