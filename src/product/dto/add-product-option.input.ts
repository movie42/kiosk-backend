import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsArray, ArrayUnique, ArrayNotEmpty } from 'class-validator';

@InputType()
export class AddProductOptionInput {
  @IsInt()
  @Field(() => Int)
  productId: number;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Field(() => [String])
  names: string[];
}
