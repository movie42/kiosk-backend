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

import { OrderProduct } from './order-product';
import { Store } from './store';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Store, (entity) => entity.orders, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @OneToMany(() => OrderProduct, (item) => item.order)
  orderProducts: OrderProduct[];
}
