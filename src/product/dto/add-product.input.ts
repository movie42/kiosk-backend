import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsArray, ArrayNotEmpty, ArrayUnique, ValidateNested } from 'class-validator';

import { AddOptionCascade } from './add-option-cascade.input';

@InputType()
export class AddProductInput {
  @IsInt()
  @Field(() => Int)
  storeId: number;

  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field(() => Int)
  price: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddOptionCascade)
  @ArrayUnique()
  @Field(() => [AddOptionCascade], { nullable: true })
  options?: AddOptionCascade[];
}
