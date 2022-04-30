import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './product';

@ObjectType()
@Entity()
export class ProductOption {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  productId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Product, (entity) => entity.productOptions, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
