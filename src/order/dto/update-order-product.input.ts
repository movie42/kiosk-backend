import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class UpdateOrderProductInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  id: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  productId: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  amount: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  productOptionId: number;
}
