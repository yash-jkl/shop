import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { ShopModule } from './shop/shop.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UtilsModule,
    DatabaseModule,
    UsersModule,
    AdminModule,
    ProductsModule,
    ShopModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
