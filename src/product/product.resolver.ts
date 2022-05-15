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
  async updateProducts(@Args({ name: 'products', type: () => [EditProductInput] }) arg: EditProductInput) {
    return this.productService.updateProduct(arg.productId, {
      name: arg.name,
      price: arg.price,
      imageUrl: arg.imageUrl,
      description: arg.description,
    });
  }

  @Mutation(() => Boolean)
  async removeProducts(@Args({ name: 'product_keys', type: () => [Number] }) args: number[]) {
    return await this.productService.removeProducts(args);
  }

  @Mutation(() => Boolean)
  async addProductOptions(
    @Args({ name: 'option', type: () => [AddProductOptionInput] }) args: AddProductOptionInput[],
  ) {
    return this.productService.addOptions(args);
  }

  @Mutation(() => Boolean)
  async updateProductOption(@Args({ name: 'option', type: () => EditProductOptionInput }) arg: EditProductOptionInput) {
    return this.productService.updateOption(arg.id, { name: arg.name });
  }

  @Mutation(() => Boolean)
  async removeProductOptions(@Args({ name: 'option_id', type: () => [Number] }) args: number[]) {
    return this.productService.removeOptions(args);
  }
}
