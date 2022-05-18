import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

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
}
