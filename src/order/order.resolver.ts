import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from '../common/dto/pagination.args';
import { Product } from '../product/entity/product.entity';
import { AddOrderInput } from './dto/add-order.input';
import { RemoveOrderProductInput } from './dto/delete-order-product.input';
import { OrderStatusArgs } from './dto/order-status.args';
import { StoreIdArgs } from './dto/store-id.args';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @ResolveField(() => [Product])
  async products(@Parent() order: Order) {
    return this.orderService.getOrderProductsByLoader(order.id);
  }

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

  @Mutation(() => Boolean)
  async updateOrder(@Args({ name: 'updateOrderProduct', type: () => UpdateOrderInput }) args: UpdateOrderInput) {
    return this.orderService.updateOrderProducts(args.orderId, args.orderProducts);
  }

  @Mutation(() => Boolean)
  async removeOrderProducts(
    @Args('removeOrderProduct', { type: () => RemoveOrderProductInput }) args: RemoveOrderProductInput,
  ) {
    return this.orderService.removeOrderProducts(args.orderId, args.orderProductIds);
  }
}
