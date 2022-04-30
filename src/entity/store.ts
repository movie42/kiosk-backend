import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from './order';
import { Product } from './product';
import { User } from './user';

@ObjectType()
@Entity()
export class Store {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field()
  @Column('varchar', { length: 255 })
  code: string;

  @Field()
  @Column('varchar', { length: 255 })
  address: string;

  @Field()
  @Column('varchar', { length: 255 })
  phone: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  ownerId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (entity) => entity.stores, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => Product, (item) => item.store)
  products: Product[];

  @OneToMany(() => Order, (item) => item.store)
  orders: Order[];
}
