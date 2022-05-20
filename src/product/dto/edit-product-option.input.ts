import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class EditProductOptionInput {
  @IsInt()
  @Field(() => Int)
  optionId: number;

  @IsString()
  @Field()
  name: string;
}
