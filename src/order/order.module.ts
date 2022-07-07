import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '../product/product.module';
import { OrderProduct } from './entity/order-product.entity';
import { Order } from './entity/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderProductRepository } from './repository/order-product.repository';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Order, OrderProduct])],
  providers: [OrderResolver, OrderService, OrderRepository, OrderProductRepository],
})
export class OrderModule {}
