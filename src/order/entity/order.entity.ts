import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OrderStatusType } from '../enum/order-status';
import { OrderProduct } from './order-product.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  number: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  price: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  storeId: number;

  @Field(() => OrderStatusType)
  @Column({ type: 'enum', enum: OrderStatusType })
  status: OrderStatusType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (item) => item.order)
  orderProducts: OrderProduct[];
}
