import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './services/shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../products/entities';
import { LoggerModule } from '../utils/logger/logger.module';
import { ShopRepository } from './repository/shop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), LoggerModule],
  controllers: [ShopController],
  providers: [ShopService, ShopRepository],
})
export class ShopModule {}
