import { Query, Resolver } from '@nestjs/graphql';

import { Order } from './entity/order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async orders() {
    return this.orderService.getOrders();
  }
}
