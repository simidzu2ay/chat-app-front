import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsString()
  @Length(4, 32)
  @Field()
  username: string;

  @IsString()
  @Length(8, 64)
  @Field()
  password: string;
}
