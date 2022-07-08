import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { IPagination } from '../common/interface/pagination';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderStatusType } from './enum/order-status';
import { OrderType } from './enum/order-type';
import { IOrderProduct } from './interface/add-order-product.interface';
import { IAddOrder } from './interface/add-order.interface';
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

  async getAmountOfOrders(type: OrderType) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    return type == OrderType.HERE
      ? this.orderRepository.getAmountOfOrders({ year, month, day, start: 1000, end: 1999 })
      : this.orderRepository.getAmountOfOrders({ year, month, day, start: 2000, end: 2999 });
  }

  async createOrderNumber(type: OrderType) {
    const count = await this.getAmountOfOrders(type);
    if (count >= 999) {
      throw new InternalServerErrorException('주문 번호가 초과되었습니다.');
    }
    if (type === OrderType.HERE) {
      return 1000 + count + 1;
    } else if (type === OrderType.GO) {
      return 2000 + count + 1;
    }

    throw new BadRequestException(' OrderType이 잘못되었습니다.');
  }

  async getOrderPrice(products: IOrderProduct[]) {
    const productIds = products.map((p) => p.productId);
    const productPrices = await this.getProductPrices(productIds);
    const totalPriceByProduct = products.map((p, idx) => p.amount * productPrices[idx]);
    return totalPriceByProduct.reduce((prev, curr) => prev + curr);
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
        orderId,
        ...product,
      };
    });
    await this.orderProductRepository.addOrderProducts(products);
    return orderNum;
  }

  async updateOrderStatus(id: number, status: OrderStatusType) {
    return this.orderRepository.updateStatus(id, status);
  }
}
