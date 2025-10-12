import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './shared/user.module';
import { AdminModule } from './admin/admin.module';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV === 'test' ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE,
      entities: [User, Product, Order, OrderProduct],
      synchronize: true,
    }),
    SharedModule,
    AuthModule,
    ProductModule,
    OrderModule,
    UserModule,
    AdminModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

