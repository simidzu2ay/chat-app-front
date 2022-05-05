import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class JwtTokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
