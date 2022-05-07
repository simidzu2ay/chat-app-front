import { SendMessageInput } from './send-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(SendMessageInput) {
  @Field(() => Int)
  id: number;
}
