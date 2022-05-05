import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsString()
  @Field()
  name: string;
}
