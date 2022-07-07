import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, ValidateNested } from 'class-validator';

import { OrderType } from '../enum/order-type';
import { OrderProductInput } from './add-order-product.input';

@InputType()
export class AddOrderInput {
  @IsInt()
  @Field(() => Int)
  storeId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Field(() => [OrderProductInput])
  @Type(() => OrderProductInput)
  products: OrderProductInput[];

  @IsEnum(OrderType)
  @Field(() => OrderType)
  type: OrderType;
}
