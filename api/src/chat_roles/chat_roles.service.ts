import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRoleModel } from "./models/chat_role.model";


@Injectable()
export class ChatRolesService {

  constructor(@InjectRepository(ChatRoleModel) private chatRolesRepository: Repository<ChatRoleModel>) { }

  findAll(): Promise<ChatRoleModel[]> {
    return this.chatRolesRepository.find();
  }

  async findOneById(id: number): Promise<ChatRoleModel> {
    try {
      const chatRole = await this.chatRolesRepository.findOneOrFail({ 
        where: { id } 
      });
      return chatRole;
    } 
    catch (error) {
      throw new NotFoundException('Chat role id not found');
    }
  }
}
