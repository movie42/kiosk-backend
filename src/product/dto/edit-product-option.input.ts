import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class EditProductOptionInput {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsString()
  @Field()
  name: string;
}
