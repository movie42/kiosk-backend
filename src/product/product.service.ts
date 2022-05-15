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
    for (const productId of productIds) {
      await this.productRepository.removeProduct(productId);
    }
    return true;
  }

  async updateProducts(products: IEditProduct[]) {
    for (const product of products) {
      await this.productRepository.updateProduct(product);
    }
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

  async updateOptions(options: IEditOption[]) {
    for (const option of options) {
      await this.productOptionRepository.updateOption(option);
    }
    return true;
  }

  async removeOptions(optionIds: number[]) {
    for (const optionId of optionIds) {
      await this.productOptionRepository.removeOption(optionId);
    }
    return true;
  }
}
