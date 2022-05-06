import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenOutput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
