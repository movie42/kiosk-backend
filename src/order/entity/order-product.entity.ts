import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../../product/entity/product.entity';
import { Order } from './order.entity';

@ObjectType()
@Entity()
export class OrderProduct {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  orderId: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  productId: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  amount: number;

  @Field(() => [Int])
  @Column('simple-array')
  productOptionIds: number[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Order, (entity) => entity.orderProducts, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (entity) => entity.orders, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
