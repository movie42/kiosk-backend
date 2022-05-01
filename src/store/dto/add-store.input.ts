import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddStoreInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  code: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  phone: string;
}
