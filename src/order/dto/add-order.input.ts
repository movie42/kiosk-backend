import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum, IsInt, ValidateNested } from 'class-validator';

import { OrderType } from '../enum/order-type';
import { AddOrderProductInput } from './add-order-product.input';

@InputType()
export class AddOrderInput {
  @IsInt()
  @Field(() => Int)
  storeId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Field(() => [AddOrderProductInput])
  @Type(() => AddOrderProductInput)
  products: AddOrderProductInput[];

  @IsEnum(OrderType)
  @Field(() => OrderType)
  type: OrderType;
}
