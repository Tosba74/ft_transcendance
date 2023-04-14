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

  async create(message: string, sender_id: number, room_id: number): Promise<ChatMessageModel> {

    const res = this.chatMessagesRepository.create({
      message: message,

      sender: { id: sender_id },
      room: { id: room_id },
      sent_at: new Date(),
    });


    const created = await this.chatMessagesRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Chat message creation error');
    });

    return created;
  }


  async deleteOne(id: number): Promise<void> {
    this.chatMessagesRepository.delete(id).catch(() => {
      throw new BadRequestException('Delete message error');
    });
  }


  async deleteMessages(roomId: number): Promise<void> {
    const messages = await this.chatMessagesRepository.find({
      where: {
        room: { id: roomId },
      },
      relations: {
        room: true
      },
    });

    if (messages !== null) {
      await Promise.all(messages.map(async (message) => {
        await this.deleteOne(message.id)
          .catch(() => {
            console.log('delete message error');
          });
      }))
        .catch(() => {
          console.log('delete messages error');
        });
    }
  }

}
