import { Injectable } from '@nestjs/common';

import { IAddOption } from './interface/add-option.interface';
import { IAddProduct } from './interface/add-product.interface';
import { IEditOption } from './interface/edit-option.interface';
import { IEditProduct } from './interface/edit-product.interface';
import { ProductOptionRepository } from './repository/product-option.repository';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productOptionRepository: ProductOptionRepository,
  ) {}

  async getProducts(storeId: number) {
    return await this.productRepository.getProductsByStoreId(storeId);
  }

  async addProducts(products: IAddProduct[]) {
    const suc: boolean[] = [];
    for (const product of products) {
      const cnt: number = await this.productRepository.getProductsNumberByStoreIdAndName(product.storeId, product.name);
      if (cnt == 0) {
        suc.push(await this.productRepository.addProduct(product));
      } else {
        suc.push(false);
      }
    }
    return suc;
  }

  async deleteProducts(keys: number[]) {
    const suc: boolean[] = [];
    for (const key of keys) {
      suc.push(await this.productRepository.deleteProduct(key));
    }
    return suc;
  }

  async editProducts(products: IEditProduct[]) {
    const suc: boolean[] = [];
    for (const product of products) {
      suc.push(await this.productRepository.editProduct(product));
    }
    return suc;
  }

  async addOptions(options: IAddOption[]) {
    const suc: boolean[] = [];

    for (const option of options) {
      const cnt = await this.productRepository.count({ where: { id: option.productId } });
      if (cnt != 0) {
        suc.push(await this.productOptionRepository.addOption(option));
      } else {
        suc.push(false);
      }
    }
    return suc;
  }

  async editOptions(options: IEditOption[]) {
    const suc: boolean[] = [];
    for (const option of options) {
      suc.push(await this.productOptionRepository.editOption(option));
    }
    return suc;
  }

  async deleteOptions(optionIds: number[]) {
    const suc: boolean[] = [];
    for (const optionId of optionIds) {
      suc.push(await this.productOptionRepository.deleteOption(optionId));
    }
    return suc;
  }
}
