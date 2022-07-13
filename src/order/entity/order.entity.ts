import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Store } from '../../store/entity/store.entity';
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
  @Column({ type: 'enum', enum: OrderStatusType, default: OrderStatusType.READY })
  status: OrderStatusType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (item) => item.order, { eager: true })
  orderProducts: OrderProduct[];

  @ManyToOne(() => Store, (entity) => entity.orders, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'storeId' })
  store: Store;
}
