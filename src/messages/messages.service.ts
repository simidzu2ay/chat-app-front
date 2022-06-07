import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Chat } from '../chats/entities/chat.entity';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';
import { UserMessage } from './entities/user-message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(UserMessage)
    private userMessagesRepository: Repository<UserMessage>
  ) {}

  async send(messageInput: SendMessageInput, from: number) {
    const newMessage = this.messagesRepository.create({
      chatId: messageInput.chatId,
      fromUserId: from,
      text: messageInput.text,
    });

    const [message, chat] = await Promise.all([
      this.messagesRepository.save(newMessage),

      this.chatRepository.findOne(messageInput.chatId, {
        loadRelationIds: {
          relations: ['members'],
        },
      }),
    ]);

    await this.userMessagesRepository
      .createQueryBuilder()
      .insert()
      .values(
        // userId & messageId is readonly values
        // @ts-ignore
        chat.membersIds.map(mId => ({
          user: mId,
          message: message.id,
          userMessageId: () =>
            `((SELECT COALESCE(MAX(user_message_id), 0) FROM user_message WHERE user_id = ${mId}) + 1)`,
        }))
      )
      .execute();

    const userMessages = await this.userMessagesRepository.find({
      where: {
        message: message.id
      }
    })
    
    return userMessages;
  }

  public async convertFromUserToDBSavingId(userMessage: UserMessage): Promise<Message> {
    const message = await this.messagesRepository.findOne(userMessage.messageId);

    return {
      ...message,
      id: userMessage.userMessageId
    };
  }

  public async convertFromDbToUser(message: Message, userId: number): Promise<UserMessage> {
    const userMessage = await this.userMessagesRepository.findOne({
      where: {
        messageId: message.id,
        userId
      }
    })

    return userMessage
  }
}
