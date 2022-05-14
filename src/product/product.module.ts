import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductOptionRepository } from './repository/product-option.repository';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, ProductOptionRepository])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
