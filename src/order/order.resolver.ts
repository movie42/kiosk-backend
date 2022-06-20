import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from '../common/dto/pagination.args';
import { Product } from '../product/entity/product.entity';
import { OrderStatusInput } from './dto/order-status.input';
import { StoreIdArgs } from './dto/store-id.args';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async orders(@Args() args: StoreIdArgs, @Args() paginationArgs: PaginationArgs) {
    return this.orderService.getOrders(args, paginationArgs);
  }

  @Mutation(() => Boolean)
  async updateOrderStatus(@Args('id', { type: () => Int }) id: number, @Args('status') input: OrderStatusInput) {
    return this.orderService.updateOrderStatus(id, input);
  }

  @ResolveField(() => [Product])
  async products(@Parent() order: Order) {
    return this.orderService.getOrderProductsByLoader(order.id);
  }
}
