import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendMessageInput } from './dto/send-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>
  ) {}

  async send(message: SendMessageInput, from: number) {
    const newMessage = this.messagesRepository.create({
      chatId: message.chatId,
      fromUserId: from,
      text: message.text,
    });

    return await this.messagesRepository.save(newMessage);
  }
}
