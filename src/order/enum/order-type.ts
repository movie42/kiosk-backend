import { registerEnumType } from '@nestjs/graphql';

export enum OrderType {
  HERE = 'here',
  GO = 'go',
}

registerEnumType(OrderType, { name: 'OrderType' });
