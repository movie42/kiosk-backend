import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { IAddProduct } from '../interface/add-product.interface';
import { IEditProduct } from '../interface/edit-product.interface';

@Injectable()
export class ProductRepository {
  private productsLoader = new DataLoader<number, Product[] | undefined>(
    async (storeIds: number[]) => {
      const products = await this.getProductsByStoreIds(storeIds);
      return storeIds.map((storeId) => products.filter((products) => products.storeId === storeId));
    },
    { cache: false },
  );

  constructor(@InjectRepository(Product) private repository: Repository<Product>) {}

  async getProductsByLoader(storeId: number) {
    return this.productsLoader.load(storeId);
  }

  async getProductsByStoreIds(storeIds: number[]) {
    return this.repository.findBy({ storeId: In(storeIds) });
  }

  async getProductPrices(productIds: number[]) {
    return this.repository.find({
      select: ['price'],
      where: {
        id: In(productIds),
      },
    });
  }

  async existProductByUniqueIds(ids: number[]) {
    const count = await this.repository.count({ where: { id: In(ids) } });
    return count === ids.length;
  }

  async isProductAvailable(productId: number) {
    const product = await this.repository.findOneBy({ id: productId });
    return product.isAvailable;
  }

  async addProducts(products: IAddProduct[]) {
    return await this.repository.save(this.repository.create(products));
  }

  async removeProducts(ids: number[]) {
    await this.repository.delete(ids);
    return true;
  }

  async updateProduct(productId: number, product: IEditProduct) {
    const updatedProduct = this.repository.create(product);
    await this.repository.update(productId, updatedProduct);
    return true;
  }

  async toggleIsAvailable(id: number) {
    await this.repository
      .createQueryBuilder()
      .update('product')
      .set({ isAvailable: () => '!isAvailable' })
      .where('id = :id', { id })
      .execute();
    return true;
  }
}
