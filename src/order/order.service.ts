import { Injectable } from '@nestjs/common';

import { IPagination } from '../common/interface/pagination';
import { IStore } from './interface/store-id.interface';
import { OrderProductRepository } from './repository/order-product.repository';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
  ) {}

  async getOrderProductsByLoader(orderId: number) {
    return this.orderProductRepository.getOrderProductsByLoader(orderId);
  }

  async getOrders(args: IStore, pagination: IPagination) {
    return this.orderRepository.getOrders(args, pagination);
  }
}
