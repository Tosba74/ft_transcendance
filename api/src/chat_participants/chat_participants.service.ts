import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { ChatParticipantModel } from "./models/chat_participant.model";
import { UpdateRoleDto } from './dto/update-role';
import { MuteParticipantDto } from './dto/mute-participant';
import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';
import { ChatsService } from 'src/chats/chats.service';
import { ChannelDto } from 'src/_shared_dto/channel.dto';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatParticipantsService {

  constructor(
    @InjectRepository(ChatParticipantModel) private chatParticipantsRepository: Repository<ChatParticipantModel>,
    private usersService: UsersService,
    @Inject(forwardRef(() => ChatsService))
    private chatsService: ChatsService
  ) { }

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
      throw new NotFoundException('Chat participant id not found');
    }
  }


  async findParticipant(participantId: number, roomId: number): Promise<ChatParticipantModel> {
    try {
      const chatParticipant = await this.chatParticipantsRepository.findOneOrFail({
        where: {
          participant: { id: participantId },
          room: { id: roomId },
        }
      });
      return chatParticipant;
    } catch (error) {
      throw new NotFoundException('Chat participant id not found');
    }
  }


  async listAvailableUserChats(id: number): Promise<ChannelDto[]> {

    const myParticipations = await this.chatParticipantsRepository.find({
      where: {
        participant: { id: id },
      },
      relations: { room: true },
    });

    const myChatsId = myParticipations.map(participation => participation.room.id);

    let publicChats = await this.chatsService.findPublicChats();
    publicChats = publicChats.filter(chat => myChatsId.indexOf(chat.id) == -1);

    return publicChats.map(chat => {
      return {
        ...chat,
        password: chat.password != undefined && chat.password.length > 0,
        type: chat.type.id,
      }
    });
  }


  async listUserChats(id: number): Promise<ChannelDto[]> {
    const myChats = await this.chatParticipantsRepository.find({
      select: { id: true, created_at: true, updated_at: true, room: { id: true, name: true, password: true } },
      where: {
        participant: { id: id },
        role: { id: Not(ChatRoleModel.BAN_ROLE) },
      },
      relations: {
        room: { type: true }
      },
    });

    const ret = await Promise.all(myChats.map(async chat => {
      const myRole = await this.get_role(id, chat.room.id);
      return {
        ...chat.room,
        password: chat.room.password != undefined && chat.room.password.length > 0,
        type: chat.room.type.id,
        role: myRole,
      }
    }));

    return ret;
  }


  async listBannedUserChats(id: number): Promise<ChannelDto[]> {
    const chats = await this.chatParticipantsRepository.find({
      select: { id: true, created_at: true, updated_at: true, room: { id: true, name: true, password: true } },
      where: {
        participant: { id: id },
        role: { id: ChatRoleModel.BAN_ROLE },
      },
      relations: {
        room: { type: true }
      },
    });

    return chats.map(chat => {
      return {
        ...chat.room,
        password: chat.room.password != undefined && chat.room.password.length > 0,
        type: chat.room.type.id,
      }
    });
  }


  async create(user_id: number, chat_id: number, role_id: number): Promise<ChatParticipantModel> {

    const res = this.chatParticipantsRepository.create({

      participant: { id: user_id },
      room: { id: chat_id },
      role: new ChatRoleModel(role_id),
      muted_until: new Date(),
    });

    const created = await this.chatParticipantsRepository.save(res).catch((err: any) => {
      throw new BadRequestException('Chat message creation error');
    });

    return created;
  }


  async get_role(participantId: number, roomId: number): Promise<number> {
    const chatParticipant = await this.chatParticipantsRepository.findOneOrFail({
      where: {
        participant: { id: participantId },
        room: { id: roomId },
      },
      relations: {
        role: true
      },
    });
    return chatParticipant.role.id;
  }


  async update_role(updateRoleDto: UpdateRoleDto): Promise<ChatParticipantModel> {
    const destUser = await this.findParticipant(updateRoleDto.participantId, updateRoleDto.roomId);
    destUser.role = new ChatRoleModel(updateRoleDto.new_role);

    const created = await this.chatParticipantsRepository.save(destUser).catch((err: any) => {
      throw new BadRequestException('Chat participant role update error');
    });

    return created;
  }


  async mute_participant(id: number, muteParticipantDto: MuteParticipantDto): Promise<ChatParticipantModel> {
    const destUser = await this.findOneById(id);


    let end = new Date();
    end.setSeconds(end.getSeconds() + muteParticipantDto.timeout);

    destUser.muted_until = end;

    const created = await this.chatParticipantsRepository.save(destUser).catch((err: any) => {
      throw new BadRequestException('Chat participant mute error');
    });

    return created;
  }

  async mute(participantId: number, roomId: number, timeOutInSec: number): Promise<ChatParticipantModel> {
	const destUser = await this.findParticipant(participantId, roomId);

    let end = new Date();
    end.setSeconds(end.getSeconds() + timeOutInSec);

    destUser.muted_until = end;

    const created = await this.chatParticipantsRepository.save(destUser).catch((err: any) => {
      throw new BadRequestException('Chat participant mute error');
    });

    return created;
  }


  async delete(id: number): Promise<void> {
    try {
      const participant = await this.findOneById(id);
      this.chatParticipantsRepository.delete(id);
    }
    catch (error) {
      throw new NotFoundException('Chat participant id not found');
    }
  }
}
