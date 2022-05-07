import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { User } from '../users/entities/user.entity';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { CurrentUserId } from '../auth/current-user.decorator';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesServise: MessagesService,
    private readonly usersServise: UsersService
  ) {}

  @Mutation(() => Chat)
  async createChat(
    @Args('input') createChatInput: CreateChatInput,
    @CurrentUserId() userId
  ) {
    const members = [...new Set([userId, ...createChatInput.members])];

    return await this.chatsService.create({
      members,
      name: createChatInput.name,
      ownerId: userId,
    });
  }

  @ResolveField('members', () => [User])
  async getChatMembers(@Parent() parent: Chat) {
    return await this.usersServise.findMany(parent.membersIds);
  }

  @ResolveField('owner', () => User)
  async getChatOwner(@Parent() parent: Chat) {
    return await this.usersServise.findOne(parent.ownerId);
  }
}
