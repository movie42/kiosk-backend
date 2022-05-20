import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Store } from '../../store/entity/store.entity';
import { Option } from './option.entity';
import { OrderProduct } from './order-product.entity';

@ObjectType()
@Entity()
@Unique('nameAndStoreId', ['name', 'storeId'])
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field({ nullable: true })
  @Column('varchar', { length: 255 })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  price: number;

  @Field({ nullable: true })
  @Column('varchar', { length: 255, nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 255, nullable: true })
  description?: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  storeId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Store, (entity) => entity.products, { createForeignKeyConstraints: false })
  store: Store;

  @Field(() => [Option])
  @OneToMany(() => Option, (item) => item.product)
  options: Option[];

  @OneToMany(() => OrderProduct, (item) => item.product)
  orders: OrderProduct[];
}
