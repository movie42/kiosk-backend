import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

import { OrderStatusType } from '../enum/order-status';

@ArgsType()
export class OrderStatusArgs {
  @IsEnum(OrderStatusType)
  @Field(() => OrderStatusType)
  status: OrderStatusType;
}
