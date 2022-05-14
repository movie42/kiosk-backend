import { Args, Query, Resolver } from '@nestjs/graphql';

import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async storeProducts(@Args('storeId') storeId: number) {
    return this.productService.getStoreProductsByStoreId(storeId);
  }
}
