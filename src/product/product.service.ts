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

  async getStoreProductsByStoreId(storeId: number) {
    return this.productRepository.getStoreProductsByStoreId(storeId);
  }

  async addProducts(products: IAddProduct[]) {
    await this.productRepository.addProducts(products);
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
    const productIds = options.map((v) => v.productId);
    const isExistIds = await this.productRepository.existProductByIds(productIds);
    if (isExistIds) {
      return await this.productOptionRepository.addOptions(options);
    } else {
      return false;
    }
  }

  async updateOption(optionId: number, option: IEditOption) {
    await this.productOptionRepository.updateOption(optionId, option);
    return true;
  }

  async removeOptions(optionIds: number[]) {
    return await this.productOptionRepository.removeOptions(optionIds);
  }
}
