import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entity/order.entity';

@Injectable()
export class OrderRepository {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async getOrders() {
    return this.repository.find();
  }
}
