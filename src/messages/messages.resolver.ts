import { BadRequestException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUserId } from '../auth/current-user.decorator';
import { ChatsService } from '../chats/chats.service';
import { Chat } from '../chats/entities/chat.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private readonly chatsService: ChatsService
  ) {}

  @Mutation(() => Message)
  async sendMessage(
    @Args('input') message: SendMessageInput,
    @CurrentUserId() userId: number
  ) {
    if (await this.chatsService.findOne(message.chatId)) {
      return await this.messagesService.send(message, userId);
    }
    throw new BadRequestException("Chat doesn't exists");
  }

  @ResolveField('fromUser', () => User)
  async getFromUser(@Parent() parent: Message) {
    return await this.usersService.findOne(parent.fromUserId);
  }

  @ResolveField('chat', () => Chat)
  async getChat(@Parent() parent: Message) {
    return await this.chatsService.findOne(parent.chatId);
  }
}
