import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatTypeModel } from "./models/chat_type.model";


@Injectable()
export class ChatTypesService {

  constructor(@InjectRepository(ChatTypeModel) private chatTypesRepository: Repository<ChatTypeModel>) { }

  findAll(): Promise<ChatTypeModel[]> {
    return this.chatTypesRepository.find();
  }

  async findOneById(id: number): Promise<ChatTypeModel> {
    try {
      const chatType = await this.chatTypesRepository.findOneOrFail({ 
        where: { id } 
      });
      return chatType;
    } 
    catch (error) {
      throw new NotFoundException('Chat type id not found');
    }
  }
}
