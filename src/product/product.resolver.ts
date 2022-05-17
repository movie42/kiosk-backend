import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddProductOptionInput } from './dto/add-product-option.input';
import { AddProductInput } from './dto/add-product.input';
import { EditProductOptionInput } from './dto/edit-product-option.input';
import { EditProductInput } from './dto/edit-product.input';
import { removeProductOptionInput } from './dto/remove-product-option.input';
import { removeProductInput } from './dto/remove-product.input';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

// TODO: Store에 대한 소유자 권한 체크 필요(Mutation들)
@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  @Query(() => [Product])
  async storeProducts(@Args('storeId') storeId: number) {
    return this.productService.getStoreProductsByStoreId(storeId);
  }

  @Mutation(() => Boolean)
  async addProducts(@Args({ name: 'products', type: () => [AddProductInput] }) args: AddProductInput[]) {
    return this.productService.addProducts(args);
  }

  @Mutation(() => Boolean)
  async updateProduct(@Args({ name: 'products', type: () => EditProductInput }) arg: EditProductInput) {
    return this.productService.updateProduct(arg.productId, arg);
  }

  @Mutation(() => Boolean)
  async removeProducts(@Args({ name: 'productIds', type: () => removeProductInput }) args: removeProductInput) {
    return await this.productService.removeProducts(args.productIds);
  }

  @Mutation(() => Boolean)
  async addProductOptions(
    @Args({ name: 'option', type: () => [AddProductOptionInput] }) args: AddProductOptionInput[],
  ) {
    return this.productService.addOptions(args);
  }

  @Mutation(() => Boolean)
  async updateProductOption(@Args({ name: 'option', type: () => EditProductOptionInput }) arg: EditProductOptionInput) {
    return this.productService.updateOption(arg.optionId, arg);
  }

  @Mutation(() => Boolean)
  async removeProductOptions(
    @Args({ name: 'optionIds', type: () => removeProductOptionInput }) args: removeProductOptionInput,
  ) {
    return this.productService.removeOptions(args.OptionIds);
  }
}
