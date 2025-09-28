import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { SharedModule } from '../shared/shared.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    SharedModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService] 
})
export class ProductModule {}

