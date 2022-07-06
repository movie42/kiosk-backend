import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

import { OrderStatusType } from '../enum/order-status';

@InputType()
export class OrderStatusInput {
  @IsEnum(OrderStatusType)
  @Field(() => OrderStatusType)
  status: OrderStatusType;
}
