import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { IAddProduct } from '../interface/add-product.interface';
import { IEditProduct } from '../interface/edit-product.interface';

@Injectable()
export class ProductRepository {
  constructor(@InjectRepository(Product) private repository: Repository<Product>) {}
  async getProductsByStoreId(_storeId: number) {
    return await this.repository.find({ where: { storeId: _storeId }, relations: ['options'] });
  }

  async existsStoreProductByName(storeId: number, name: string) {
    const cnt = await this.repository.count({ where: { storeId: storeId, name: name } });
    return cnt != 0;
  }

  async existsProductById(id: number) {
    const cnt = await this.repository.count({ where: { id: id } });
    return cnt != 0;
  }

  async addProduct(product: IAddProduct) {
    await this.repository.save(this.repository.create(product));
    return true;
  }

  async removeProduct(id: number) {
    await this.repository.delete(id);
    return true;
  }

  async updateProduct(product: IEditProduct) {
    await this.repository.update(product.id, product);
    return true;
  }
}