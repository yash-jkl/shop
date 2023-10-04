import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductEntity } from '../products/entities';
import { UserEntity } from '../users/entities';
import { OrderEntity } from './entities/order.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity, UserEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
