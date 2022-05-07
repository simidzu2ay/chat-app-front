import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from '../chats/chats.module';
import { PubSubModule } from '../pubsub/pubsub.module';
import { UsersModule } from '../users/users.module';
import { Message } from './entities/message.entity';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';

@Module({
  providers: [MessagesResolver, MessagesService],
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    forwardRef(() => ChatsModule),
    PubSubModule,
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
