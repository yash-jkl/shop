import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    UtilsModule,
    DatabaseModule,
    UsersModule,
    AdminModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
