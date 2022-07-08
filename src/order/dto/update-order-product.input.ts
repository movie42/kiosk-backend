import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class UpdateOrderProductInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  id: number;

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
