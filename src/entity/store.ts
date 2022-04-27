import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  phone: string;

  @Field()
  @Column('varchar', { length: 255 })
  address: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  ownerId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
