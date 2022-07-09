import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsPositive } from 'class-validator';

import { IsSameLength } from '../custom-validator/IsSameLength';

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
  @IsSameLength('amount', { message: 'amount와 productOptionIds의 길이는 일치해야 합니다.' })
  @Field(() => [Int])
  productOptionIds: number[];
}
