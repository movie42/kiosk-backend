import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsInt } from 'class-validator';

@InputType()
export class removeProductOptionInput {
  @IsArray()
  @IsInt({ each: true })
  @Field(() => [Int])
  OptionIds: number[];
}
