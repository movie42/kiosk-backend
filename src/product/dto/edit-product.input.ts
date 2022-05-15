import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class EditProductInput {
  @IsInt()
  @Field(() => Int)
  productId: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsInt()
  @Field({ nullable: true })
  price?: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;
}
