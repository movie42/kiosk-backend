import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Option } from './entity/option.entity';
import { Product } from './entity/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductOptionRepository } from './repository/product-option.repository';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Option])],
  providers: [ProductResolver, ProductService, ProductRepository, ProductOptionRepository],
  exports: [ProductService],
})
export class ProductModule {}
