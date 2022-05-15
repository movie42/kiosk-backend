import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { IAddProduct } from '../interface/add-product.interface';
import { IEditProduct } from '../interface/edit-product.interface';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private repository: Repository<Product>) {}
  async getStoreProductsByStoreId(storeId: number) {
    return this.repository.findBy({ storeId });
  }

  async existsStoreProductByName(storeId: number, name: string) {
    const count = await this.repository.count({ where: { storeId: storeId, name: name } });
    return count > 0;
  }

  async existsProductById(id: number) {
    const count = await this.repository.count({ where: { id: id } });
    return count > 0;
  }

  async addProduct(product: IAddProduct) {
    await this.repository.save(this.repository.create(product));
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
