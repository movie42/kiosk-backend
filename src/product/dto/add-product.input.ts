import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class AddProductInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  price: number;

  @IsString()
  @IsOptional()
  @Field()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  storeId: number;
}
