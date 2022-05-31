import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class StoreIdArgs {
  @IsInt()
  @Field(() => Int)
  storeId: number;
}
