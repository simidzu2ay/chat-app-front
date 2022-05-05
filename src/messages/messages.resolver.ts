import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';
import { UsersService } from '../users/users.service';
import { ChatsService } from '../chats/chats.service';
import { Chat } from '../chats/entities/chat.entity';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersServise: UsersService,
    private readonly chatsServise: ChatsService
  ) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput
  ) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput
  ) {
    return this.messagesService.update(
      updateMessageInput.id,
      updateMessageInput
    );
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }

  @ResolveField('fromUser', () => User)
  async getFromUser(@Parent() parent: Message) {
    return await this.usersServise.findOne(parent.fromUserId);
  }

  @ResolveField('chat', () => Chat)
  async getChat(@Parent() parent: Message) {
    return await this.chatsServise.findOne(parent.chatId);
  }
}
