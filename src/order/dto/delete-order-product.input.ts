import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsInt, IsPositive } from 'class-validator';

@InputType()
export class RemoveOrderProductInput {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  orderId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Field(() => [Int])
  orderProductIds: number[];
}
