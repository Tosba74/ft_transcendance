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
      const chats: ChatModel = await this.chatsRepository.findOneOrFail({ where: { id } });
      return chats;
    }
    catch (error) {
      throw new NotFoundException();
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

    res.type = new ChatTypeModel(createChatDto.type);

    if (createChatDto.password) {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(createChatDto.password, saltRounds);

      res.password = hash;
    }

    try {
      const created = await this.chatsRepository.save(res);

      

      return created;
    }
    catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const user = await this.findOneById(id);
      this.chatsRepository.delete(user);
    }
    catch (error) {
      throw new NotFoundException();
    }
  }
}
