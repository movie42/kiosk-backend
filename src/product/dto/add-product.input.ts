import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

@InputType()
export class AddProductInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @IsString()
  @Field()
  imageUrl: string;

  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  storeId: number;
}
