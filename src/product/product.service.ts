import { Injectable } from '@nestjs/common';

import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getStoreProductsByStoreId(storeId: number) {
    return this.productRepository.getStoreProductsByStoreId(storeId);
  }
}
