import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly chatsRepository: Repository<Chat>
  ) {}

  async create(createChatInput: CreateChatInput) {
    const chat = this.chatsRepository.create(createChatInput);

    return await this.chatsRepository.save(chat);
  }

  async findAll() {
    return await this.chatsRepository.find();
  }

  async findOne(id: number) {
    return await this.chatsRepository.findOne(id);
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
