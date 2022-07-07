import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsInt, IsPositive } from 'class-validator';

@InputType()
export class OrderProductInput {
  @IsInt()
  @Field(() => Int)
  productId: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  amount: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Field(() => [Int])
  productOptionIds: number[];
}
