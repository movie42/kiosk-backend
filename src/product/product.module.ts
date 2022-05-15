import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entity/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver, ProductService, ProductRepository],
})
export class ProductModule {}
