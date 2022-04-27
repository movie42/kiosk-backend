import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  number: number;

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

  @Field(() => Int)
  @Column({ type: 'int' })
  productId: number;

  @Field(() => [Int])
  @Column('simple-array')
  productOptionIds: number[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
