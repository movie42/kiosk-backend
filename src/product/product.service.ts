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

  async getProductsByStoreId(storeId: number) {
    return this.productRepository.getProductsByLoader(storeId);
  }

  async getOptionsByProductId(productId: number) {
    return this.productOptionRepository.getOptionsByLoader(productId);
  }

  async getStoreProductsByStoreId(storeId: number) {
    return this.productRepository.getProductsByLoader(storeId);
  }

  async isProductAvailable(productId: number) {
    return this.productRepository.isProductAvailable(productId);
  }

  async addProducts(products: IAddProduct[]) {
    const addedProducts = await this.productRepository.addProducts(products);
    return addedProducts.map((product) => product.id);
  }

  async removeProducts(productIds: number[]) {
    return this.productRepository.removeProducts(productIds);
  }

  async updateProduct(productId: number, product: IEditProduct) {
    return this.productRepository.updateProduct(productId, product);
  }

  async existProductByIds(productIds: number[]) {
    const uniqueIds = productIds.filter((e, i) => productIds.indexOf(e) === i);
    return this.productRepository.existProductByUniqueIds(uniqueIds);
  }

  async addOptions(options: IAddOption[]) {
    const productIds = options.map((v) => v.productId);
    const isExistIds = await this.existProductByIds(productIds);
    if (!isExistIds) {
      return false;
    }

    return this.productOptionRepository.addOptions(options);
  }

  async updateOptions(options: IEditOption[]) {
    for (const option of options) {
      await this.productOptionRepository.updateOption(option);
    }
    return true;
  }

  async removeOptions(optionIds: number[]) {
    return this.productOptionRepository.removeOptions(optionIds);
  }

  async toggleIsAvailable(id: number) {
    return this.productRepository.toggleIsAvailable(id);
  }
}
