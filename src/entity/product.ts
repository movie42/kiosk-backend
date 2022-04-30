import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderProduct } from './order-product';
import { ProductOption } from './product-option';
import { Store } from './store';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  price: number;

  @Field()
  @Column('varchar', { length: 255 })
  imageUrl: string;

  @Field()
  @Column('varchar', { length: 255 })
  description: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  storeId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Store, (entity) => entity.products, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @OneToMany(() => ProductOption, (item) => item.product)
  productOptions: ProductOption[];

  @OneToMany(() => OrderProduct, (item) => item.product)
  orderProducts: OrderProduct[];
}
