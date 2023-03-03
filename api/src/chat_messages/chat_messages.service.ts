import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatMessageModel } from "./models/chat_message.model";
import { CreateMessageDto } from './dto/create-message';
import { UserModel } from 'src/users/models/user.model';
import { createDecipheriv } from 'crypto';

@Injectable()
export class ChatMessagesService {

  constructor(@InjectRepository(ChatMessageModel) private chatMessagesRepository: Repository<ChatMessageModel>) { }

  findAll(): Promise<ChatMessageModel[]> {
    return this.chatMessagesRepository.find();
  }

  async findOneById(id: number): Promise<ChatMessageModel> {
    try {
      const chatMessage = await this.chatMessagesRepository.findOneOrFail({
        where: { id }
      });
      return chatMessage;
    }
    catch (error) {
      throw new NotFoundException('Chat message id not found');
    }
  }

  async create(createMessageDto: CreateMessageDto): Promise<ChatMessageModel> {

    const res = this.chatMessagesRepository.create({
      message: createMessageDto.message,

      sender: { id: createMessageDto.user_id },
      room: { id: createMessageDto.chat_id },
      sent_at: new Date(),
    });


    const created = await this.chatMessagesRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Chat message creation error');
    });

    return created;
  }


  async delete(id: number): Promise<void> {
    try {
      const message = await this.findOneById(id);
      this.chatMessagesRepository.delete({ id: id });
    }
    catch (error) {
      throw new NotFoundException('Chat message id not found');
    }
  }
}
