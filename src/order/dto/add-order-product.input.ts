import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class AddOrderProductInput {
  @IsInt()
  @Field(() => Int)
  productId: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  amount: number;

  @IsInt()
  @Field(() => Int)
  productOptionId: number;
}
