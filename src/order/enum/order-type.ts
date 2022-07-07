import { registerEnumType } from '@nestjs/graphql';

export enum OrderType {
  HERE = 1,
  GO = 2,
}

registerEnumType(OrderType, { name: 'OrderType' });
