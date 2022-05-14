import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ArgsType()
export class UpdateUserArgs {
  @IsInt()
  @Field(() => Int)
  userId: number;

  @IsString()
  @Field()
  name: string;
}
