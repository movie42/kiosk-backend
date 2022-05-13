import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class EditProductInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  id: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsNumber()
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
