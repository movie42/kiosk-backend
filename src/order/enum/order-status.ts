import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatusType {
  READY = 'ready',
  DONE = 'done',
  COMPLETE = 'complete',
  CANCELED = 'canceled',
}

registerEnumType(OrderStatusType, { name: 'OrderStatusType' });
