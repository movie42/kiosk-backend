import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from '../common/dto/pagination.args';
import { Product } from '../product/entity/product.entity';
import { AddOrderInput } from './dto/add-order.input';
import { OrderStatusArgs } from './dto/order-status.args';
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

  @Mutation(() => Int)
  async addOrder(@Args({ name: 'order', type: () => AddOrderInput }) args: AddOrderInput) {
    return this.orderService.addOrder(args);
  }

  @Mutation(() => Boolean)
  async updateOrderStatus(@Args('id', { type: () => Int }) id: number, @Args() args: OrderStatusArgs) {
    return this.orderService.updateOrderStatus(id, args.status);
  }

  @ResolveField(() => [Product])
  async products(@Parent() order: Order) {
    return this.orderService.getOrderProductsByLoader(order.id);
  }
}
