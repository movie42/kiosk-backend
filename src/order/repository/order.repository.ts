import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPagination } from '../../common/interface/pagination';
import { Order } from '../entity/order.entity';
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
}
