import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { IAddProduct } from '../interface/add-product.interface';
import { IEditProduct } from '../interface/edit-product.interface';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private repository: Repository<Product>) {}
  async getStoreProductsByStoreId(storeId: number) {
    return this.repository.findBy({ storeId });
  }

  async existProductByIds(ids: number[]) {
    const count = await this.repository.count({ where: { id: In(ids) } });
    return count == ids.length;
  }

  async addProducts(products: IAddProduct[]) {
    await this.repository.save(this.repository.create(this.repository.create(products)));
    return true;
  }

  async removeProducts(ids: number[]) {
    await this.repository.delete(ids);
    return true;
  }

  async updateProduct(productId: number, product: IEditProduct) {
    await this.repository.update(productId, product);
    return true;
  }
}
