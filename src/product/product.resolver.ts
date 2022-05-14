import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddProductOptionInput } from './dto/add-product-option.input';
import { AddProductInput } from './dto/add-product.input';
import { EditProductOptionInput } from './dto/edit-product-option.input';
import { EditProductInput } from './dto/edit-product.input';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @Query(() => [Product])
  async products(@Args({ name: 'storeId', type: () => Number }) storeId: number) {
    return this.productService.getProducts(storeId);
  }

  @Mutation(() => Boolean)
  async addProducts(@Args({ name: 'products', type: () => [AddProductInput] }) args: AddProductInput[]) {
    return this.productService.addProducts(args);
  }

  // 소유자 권한 체크 필요
  @Mutation(() => Boolean)
  async editProducts(@Args({ name: 'products', type: () => [EditProductInput] }) args: EditProductInput[]) {
    return this.productService.updateProducts(args);
  }

  @Mutation(() => [Boolean])
  async deleteProducts(@Args({ name: 'product_keys', type: () => [Number] }) args: number[]) {
    return await this.productService.removeProducts(args);
  }

  @Mutation(() => [Boolean])
  async addProductOptions(
    @Args({ name: 'option', type: () => [AddProductOptionInput] }) args: AddProductOptionInput[],
  ) {
    return this.productService.addOptions(args);
  }

  @Mutation(() => Boolean)
  async editProductOptions(
    @Args({ name: 'option', type: () => [EditProductOptionInput] }) args: EditProductOptionInput[],
  ) {
    return this.productService.updateOptions(args);
  }

  @Mutation(() => Boolean)
  async deleteProductOptions(@Args({ name: 'option_id', type: () => [Number] }) args: number[]) {
    return this.productService.removeOptions(args);
  }
}
