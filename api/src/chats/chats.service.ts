import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatModel } from "./models/chat.model";
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatTypeModel } from 'src/chat_types/models/chat_type.model';


@Injectable()
export class ChatsService {

  constructor(@InjectRepository(ChatModel) private chatsRepository: Repository<ChatModel>) { }

  findAll(): Promise<ChatModel[]> {
    return this.chatsRepository.find();
  }

  async findOneById(id: number): Promise<ChatModel> {
    try {
      const chat = await this.chatsRepository.findOneOrFail({
        where: { id: id }
      });
      return chat;
    }
    catch (error) {
      throw new NotFoundException('Chat id not found');
    }
  }


  async create(createChatDto: CreateChatDto): Promise<ChatModel> {

    const res = new ChatModel();

    if (createChatDto.name) {
      res.name = createChatDto.name;
    }
    else {
      res.name = 'Temp default name';
    }

    res.type = new ChatTypeModel(createChatDto.type_id);

    if (createChatDto.password) {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(createChatDto.password, saltRounds);

      res.password = hash;
    }

    const created = await this.chatsRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Chat creation error');
    });

    return created;

  }

  async delete(id: number): Promise<void> {
    try {
      const chat = await this.findOneById(id);
      this.chatsRepository.delete({ id: id });
    }
    catch (error) {
      throw new NotFoundException('Chat id not found');
    }
  }
}
