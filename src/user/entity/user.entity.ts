import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Store } from '../../store/entity/store.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field()
  @Column('varchar', { length: 255 })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => Store, (item) => item.owner)
  stores: Store[];
}
