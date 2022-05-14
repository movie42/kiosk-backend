import { EntityRepository, Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { IAddProduct } from '../interface/add-product.interface';
import { IEditProduct } from '../interface/edit-product.interface';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProductsByStoreId(_storeId: number) {
    return await this.find({ where: { storeId: _storeId }, relations: ['options'] });
  }

  async existsStoreProductByName(storeId: number, name: string) {
    const cnt = await this.count({ where: { storeId: storeId, name: name } });
    return cnt != 0;
  }

  async existsProductById(id: number) {
    const cnt = await this.count({ where: { id: id } });
    return cnt != 0;
  }

  async addProduct(product: IAddProduct) {
    await this.save(this.create(product));
    return true;
  }

  async deleteProduct(id: number) {
    await this.delete(id);
    return true;
  }

  async editProduct(product: IEditProduct) {
    await this.update(product.id, product);
    return true;
  }
}
