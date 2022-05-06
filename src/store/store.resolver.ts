import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddStoreInput } from './dto/add-store.input';
import { Store } from './entity/store.entity';
import { StoreService } from './store.service';

@Resolver()
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

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
}
