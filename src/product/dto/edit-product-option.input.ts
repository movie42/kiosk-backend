import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class EditProductOptionInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  id: number;

  @IsOptional()
  @IsString()
  @Field()
  name: string;
}
