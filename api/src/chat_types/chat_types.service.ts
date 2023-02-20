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
      const chat_types: ChatTypeModel = await this.chatTypesRepository.findOneOrFail({ where: { id } });
      return chat_types;
    } 
    catch (error) {
      throw new NotFoundException();
    }
  }
}
