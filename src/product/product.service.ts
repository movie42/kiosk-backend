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
    for (const product of products) {
      const cnt = await this.productRepository.getProductsNumberByStoreIdAndName(product.storeId, product.name);
      if (cnt == 0) {
        await this.productRepository.addProduct(product);
      } else {
        return false;
      }
    }
    return true;
  }

  async deleteProducts(keys: number[]) {
    for (const key of keys) {
      await this.productRepository.deleteProduct(key);
    }
    return true;
  }

  async editProducts(products: IEditProduct[]) {
    for (const product of products) {
      await this.productRepository.editProduct(product);
    }
    return true;
  }

  async addOptions(options: IAddOption[]) {
    for (const option of options) {
      const cnt = await this.productRepository.count({ where: { id: option.productId } });
      if (cnt != 0) {
        await this.productOptionRepository.addOption(option);
      } else {
        return false;
      }
    }
    return true;
  }

  async editOptions(options: IEditOption[]) {
    for (const option of options) {
      await this.productOptionRepository.editOption(option);
    }
    return true;
  }

  async deleteOptions(optionIds: number[]) {
    for (const optionId of optionIds) {
      await this.productOptionRepository.deleteOption(optionId);
    }
    return true;
  }
}
