import { Field, InputType } from '@nestjs/graphql';

import { OrderStatusType } from '../enum/order-status';

@InputType()
export class OrderStatusInput {
  @Field(() => OrderStatusType)
  status: OrderStatusType;
}
