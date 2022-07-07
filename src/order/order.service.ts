import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { IPagination } from '../common/interface/pagination';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderType } from './enum/order-type';
import { IOrderProduct } from './interface/add-order-product.interface';
import { IAddOrder } from './interface/add-order.interface';
import { IOrderStatus } from './interface/order-status.interface';
import { IStore } from './interface/store-id.interface';
import { OrderProductRepository } from './repository/order-product.repository';
import { OrderRepository } from './repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getOrderProductsByLoader(orderId: number) {
    return this.orderProductRepository.getOrderProductsByLoader(orderId);
  }

  async getOrders(args: IStore, pagination: IPagination) {
    return this.orderRepository.getOrders(args, pagination);
  }

  async getProductPrices(productIds: number[]) {
    const products = await this.productRepository.getProductPrices(productIds);
    return products.map((p) => p.price);
  }

  async getNumberOfOrders(type: OrderType) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    return type == OrderType.HERE
      ? this.orderRepository.getNumberOfOrders(year, month, day, 1000, 1999)
      : this.orderRepository.getNumberOfOrders(year, month, day, 2000, 2999);
  }

  async createOrderNumber(type: OrderType) {
    const count = await this.getNumberOfOrders(type);
    if (count >= 999) {
      throw new InternalServerErrorException('주문 번호가 초과되었습니다.');
    }
    return count + 1000 * type + 1;
  }

  async getOrderPrice(products: IOrderProduct[]) {
    const productIds = products.map((p) => p.productId);
    const productPrices = await this.getProductPrices(productIds);
    return products.map((p, idx) => p.amount * productPrices[idx]).reduce((prev, curr) => prev + curr);
  }

  async addOrder(args: IAddOrder) {
    const price = await this.getOrderPrice(args.products);
    const orderNum = await this.createOrderNumber(args.type);
    const orderId = await this.orderRepository.addOrder({
      price: price,
      storeId: args.storeId,
      number: orderNum,
    });
    const products = args.products.map((product) => {
      return {
        orderId: orderId,
        ...product,
      };
    });
    await this.orderProductRepository.addOrderProducts(products);
    return orderNum;
  }

  async updateOrderStatus(id: number, input: IOrderStatus) {
    return this.orderRepository.updateStatus(id, input);
  }
}
