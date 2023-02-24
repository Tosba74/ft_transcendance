import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatParticipantModel } from "./models/chat_participant.model";
import { CreateParticipantDto } from './dto/create-participant';
import { UpdateRoleDto } from './dto/update-role';
import { MuteParticipantDto } from './dto/mute-participant';
import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';


@Injectable()
export class ChatParticipantsService {

  constructor(@InjectRepository(ChatParticipantModel) private chatParticipantsRepository: Repository<ChatParticipantModel>) { }

  findAll(): Promise<ChatParticipantModel[]> {
    return this.chatParticipantsRepository.find();
  }

  async findOneById(id: number): Promise<ChatParticipantModel> {
    try {
      const chatParticipant = await this.chatParticipantsRepository.findOneOrFail({ 
        where: { id } 
      });
      return chatParticipant;
    } 
    catch (error) {
      throw new NotFoundException();
    }
  }

  async create(createParticipantDto: CreateParticipantDto): Promise<ChatParticipantModel> {
    const res = this.chatParticipantsRepository.create({

      participant: { id: createParticipantDto.user_id },
      room: { id: createParticipantDto.chat_id },
      role: new ChatRoleModel(createParticipantDto.role_id),
      muted_until: new Date(),
    });


    try {
      const created = await this.chatParticipantsRepository.save(res);

      return created;
    }
    catch (error) {
      throw new BadRequestException();
    }
  }


  async update_role(id: number, updateRoleDto: UpdateRoleDto): Promise<ChatParticipantModel> {
    const destUser = await this.findOneById(id);

    destUser.role = new ChatRoleModel(updateRoleDto.new_role);

    try {
      const created = await this.chatParticipantsRepository.save(destUser);
      return created;
    }
    catch (error) {
      throw new BadRequestException();
    }
  }
  
  
  async mute_participant(id: number, muteParticipantDto: MuteParticipantDto): Promise<ChatParticipantModel> {
    const destUser = await this.findOneById(id);


    let end = new Date();
    end.setSeconds(end.getSeconds() + muteParticipantDto.timeout);

    destUser.muted_until = end;

    try {
      const created = await this.chatParticipantsRepository.save(destUser);

      return created;
    }
    catch (error) {
      throw new BadRequestException();
    }
  }
  
  
  async delete(id: number): Promise<void> {
    try {
      const participant = await this.findOneById(id);
      this.chatParticipantsRepository.delete({ id: id });
    }
    catch (error) {
      throw new NotFoundException();
    }
  }
  
}
