import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entity/product.entity';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private repository: Repository<Product>) {}

  async getStoreProductsByStoreId(storeId: number) {
    return this.repository.findBy({ storeId });
  }
}
