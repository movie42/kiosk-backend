import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { IPagination } from '../../common/interface/pagination';
import { Order } from '../entity/order.entity';
import { IAddOrderDAO } from '../interface/add-order-dao.interface';
import { IOrderStatus } from '../interface/order-status.interface';
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

  async getNumberOfOrders(year: number, month: number, day: number, start: number, end: number) {
    return await this.repository.count({
      where: {
        createdAt: Between(new Date(year, month, day, 0, 0, 0), new Date(year, month, day, 23, 59, 59)),
        number: Between(start, end),
      },
    });
  }

  async updateStatus(id: number, input: IOrderStatus) {
    await this.repository.update(id, { status: input.status });
    return true;
  }
}
