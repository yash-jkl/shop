import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './services/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entities';
import { ProductEntity } from '../products/entities';
import { UserEntity } from '../users/entities';
import { LoggerModule } from '../utils/logger/logger.module';
import { CartRepository } from './repository/cart.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, ProductEntity, UserEntity]),
    LoggerModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}