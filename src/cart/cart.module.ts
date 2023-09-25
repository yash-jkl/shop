import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './services/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entities';
import { ProductEntity } from '../products/entities';
import { UserEntity } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, UserEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
