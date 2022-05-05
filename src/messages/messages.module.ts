import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';

@Module({
  providers: [MessagesResolver, MessagesService],
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    forwardRef(() => ChatsModule),
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
