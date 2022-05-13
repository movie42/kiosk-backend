import { EntityRepository, Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { IAddProduct } from '../interface/add-product.interface';
import { IEditProduct } from '../interface/edit-product.interface';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProductsByStoreId(_storeId: number) {
    return await this.find({ where: { storeId: _storeId }, relations: ['options'] });
  }

  async getProductsNumberByStoreIdAndName(_storeId: number, _name: string) {
    return await this.count({ where: { storeId: _storeId, name: _name } });
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
