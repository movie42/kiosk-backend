import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from '../../order/entity/order.entity';
import { Product } from '../../product/entity/product.entity';
import { User } from '../../user/entity/user.entity';

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

  @Field()
  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (entity) => entity.stores, { createForeignKeyConstraints: false })
  owner: User;

  @OneToMany(() => Product, (item) => item.store)
  products: Product[];

  @Field(() => [Order])
  @OneToMany(() => Order, (item) => item.store, { eager: true })
  orders: Order[];
}
