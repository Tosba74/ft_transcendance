import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatModel } from "./models/chat.model";
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
        where: { id: id },
        relations: { type: true, participants: { participant: true, role: true } }
      });
      return chat;
    }
    catch (error) {
      throw new NotFoundException('Chat id not found');
    }
  }

  // async findParticipantsById(id: number): Promise<ChatModel> {
  //   try {
  //     const chat = await this.chatsRepository.findOneOrFail({
  //       where: { id: id },
  //       relations: { 
  //         participants: { 
  //           participant: true 
  //         } 
  //       }
  //     });
  //     return chat;
  //   }
  //   catch (error) {
  //     throw new NotFoundException('Chat id not found');
  //   }
  // }


  async create(name: string | undefined, type_id: number, password?: string): Promise<ChatModel> {

    const res = new ChatModel();

    if (name) {
      res.name = name;
    }
    else {
      res.name = 'Temp default name';
    }

    res.type = new ChatTypeModel(type_id);

    if (password) {
      const bcrypt = require('bcrypt');
      const saltRounds: number = 10;
      const hash: string = await bcrypt.hash(password, saltRounds);

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
