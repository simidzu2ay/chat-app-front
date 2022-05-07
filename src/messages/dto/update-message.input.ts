import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { SendMessageInput } from './send-message.input';

@InputType()
export class UpdateMessageInput extends PartialType(SendMessageInput) {
  @Field(() => Int)
  id: number;
}
