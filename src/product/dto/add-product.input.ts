import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class AddProductInput {
  @IsString()
  @Field()
  name: string;

  @IsInt()
  @Field(() => Int)
  price: number;

  @IsOptional()
  @IsString()
  @Field()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @Field()
  description: string;

  @IsInt()
  @Field(() => Int)
  storeId: number;
}
