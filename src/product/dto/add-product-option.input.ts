import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class AddProductOptionInput {
  @IsInt()
  @Field(() => Int)
  productId: number;

  @IsString()
  @Field()
  name: string;
}
