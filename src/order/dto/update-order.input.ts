import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, ValidateNested } from 'class-validator';

import { UpdateOrderProductInput } from './update-order-product.input';

@InputType()
export class UpdateOrderInput {
  @IsInt()
  @Field(() => Int)
  orderId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Field(() => [UpdateOrderProductInput])
  @Type(() => UpdateOrderProductInput)
  orderProducts: UpdateOrderProductInput[];
}
