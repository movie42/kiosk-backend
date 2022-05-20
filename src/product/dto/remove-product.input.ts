import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt } from 'class-validator';

@InputType()
export class removeProductInput {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Field(() => [Int])
  productIds: number[];
}
