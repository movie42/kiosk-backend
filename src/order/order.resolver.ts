import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from '../common/dto/pagination.args';
import { Product } from '../product/entity/product.entity';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async orders(@Args() paginationArgs: PaginationArgs) {
    return this.orderService.getOrders(paginationArgs);
  }

  @ResolveField(() => [Product])
  async products(@Parent() order: Order) {
    return this.orderService.getOrderProductsByLoader(order.id);
  }
}
