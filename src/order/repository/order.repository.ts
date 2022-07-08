import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { IPagination } from '../../common/interface/pagination';
import { Order } from '../entity/order.entity';
import { OrderStatusType } from '../enum/order-status';
import { IAddOrderDAO } from '../interface/add-order-dao.interface';
import { IGetAmountOrders } from '../interface/get-amount-of-order.interface';
import { IStore } from '../interface/store-id.interface';

@Injectable()
export class OrderRepository {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async getOrders(args: IStore, pagination: IPagination) {
    return this.repository.find({
      where: {
        storeId: args.storeId,
      },
      order: {
        id: 'DESC',
      },
      take: pagination.limit,
      skip: pagination.offset,
    });
  }

  async addOrder(args: IAddOrderDAO) {
    const newOrder = await this.repository.save(this.repository.create(args));
    return newOrder.id;
  }

  async getAmountOfOrders(args: IGetAmountOrders) {
    return await this.repository.count({
      where: {
        createdAt: Between(
          new Date(args.year, args.month, args.day, 0, 0, 0),
          new Date(args.year, args.month, args.day, 23, 59, 59),
        ),
        number: Between(args.start, args.end),
      },
    });
  }

  async updateStatus(id: number, status: OrderStatusType) {
    await this.repository.update(id, { status });
    return true;
  }
}
