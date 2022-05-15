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
      const isExistNameOnStore = await this.productRepository.existsStoreProductByName(product.storeId, product.name);
      if (!isExistNameOnStore) {
        await this.productRepository.addProduct(product);
      } else {
        return false;
      }
    }
    return true;
  }

  async removeProducts(productIds: number[]) {
    return await this.productRepository.removeProducts(productIds);
  }

  async updateProduct(productId: number, product: IEditProduct) {
    await this.productRepository.updateProduct(productId, product);
    return true;
  }

  async addOptions(options: IAddOption[]) {
    for (const option of options) {
      const isExistId = await this.productRepository.existsProductById(option.productId);
      if (isExistId) {
        await this.productOptionRepository.addOption(option);
      } else {
        return false;
      }
    }
    return true;
  }

  async updateOption(optionId: number, option: IEditOption) {
    await this.productOptionRepository.updateOption(optionId, option);
    return true;
  }

  async removeOptions(optionIds: number[]) {
    return await this.productOptionRepository.removeOptions(optionIds);
  }
}
