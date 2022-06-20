import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Product } from '../product/entity/product.entity';
import { ProductService } from '../product/product.service';
import { AddStoreInput } from './dto/add-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store } from './entity/store.entity';
import { StoreService } from './store.service';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService, private readonly productService: ProductService) {}

  @Query(() => [Store], { nullable: 'items' })
  async stores() {
    return this.storeService.getStores();
  }

  @Query(() => Store, { nullable: true })
  async store(@Args('id') id: number) {
    return this.storeService.getStoreById(id);
  }

  @Mutation(() => Boolean)
  async addStore(@Args('store') args: AddStoreInput) {
    // 임시로 작성
    // TODO: ownerId는 req.user.id로 불러와야함.
    return this.storeService.addStore({ ...args, ownerId: 4 });
  }

  // TODO: 소유자 권한 체크 필요
  @Mutation(() => Boolean)
  async removeStore(@Args('id') id: number) {
    return this.storeService.removeStore(id);
  }

  @Mutation(() => Boolean)
  async updateStore(@Args('id') id: number, @Args('store') input: UpdateStoreInput) {
    return this.storeService.updateStore(id, input);
  }

  @ResolveField(() => [Product])
  async products(@Parent() store: Store) {
    return this.productService.getProductsByStoreId(store.id);
  }
}
