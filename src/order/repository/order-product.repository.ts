import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { OrderProduct } from '../entity/order-product.entity';

@Injectable()
export class OrderProductRepository {
  private productsLoader = new DataLoader<number, OrderProduct[] | undefined>(
    async (orderIds: number[]) => {
      const orderProducts = await this.getOrderProductsByOrderId(orderIds);
      return orderIds.map((orderId) => orderProducts.filter((orderProduct) => orderProduct.orderId === orderId));
    },
    { cache: false },
  );

  constructor(@InjectRepository(OrderProduct) private repository: Repository<OrderProduct>) {}

  async getOrderProductsByLoader(orderId: number) {
    return this.productsLoader.load(orderId);
  }

  async getOrderProductsByOrderId(orderIds: number[]) {
    return this.repository.findBy({ orderId: In(orderIds) });
  }
}
