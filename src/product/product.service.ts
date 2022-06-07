import { Injectable } from '@nestjs/common';

import { AddProductOptionInput } from './dto/add-product-option.input';
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

  async getProductsByLoader(storeId: number) {
    return this.productRepository.getProductsByLoader(storeId);
  }

  async getStoreProductsByStoreId(storeId: number) {
    return this.productRepository.getProductsByLoader(storeId);
  }

  async addProducts(products: IAddProduct[]) {
    return this.productRepository.addProducts(products);
  }

  async removeProducts(productIds: number[]) {
    return this.productRepository.removeProducts(productIds);
  }

  async updateProduct(productId: number, product: IEditProduct) {
    return this.productRepository.updateProduct(productId, product);
  }

  async addOptions(optionsDto: AddProductOptionInput[]) {
    let options = [];
    optionsDto.forEach((option) => {
      options = options.concat(
        option.names.map((name) => {
          return {
            productId: option.productId,
            name: name,
          };
        }),
      );
    });
    const productIds = optionsDto.map((v) => v.productId);
    const isExistIds = await this.productRepository.existProductByIds(productIds);
    if (!isExistIds) {
      return false;
    }

    return this.productOptionRepository.addOptions(options);
  }

  async updateOption(optionId: number, option: IEditOption) {
    return this.productOptionRepository.updateOption(optionId, option);
  }

  async removeOptions(optionIds: number[]) {
    return this.productOptionRepository.removeOptions(optionIds);
  }
}
