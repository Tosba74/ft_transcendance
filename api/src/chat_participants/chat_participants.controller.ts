import { Controller, HttpCode, Param, Body, Get, Post, Put, Patch, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { ChatParticipantsService } from './chat_participants.service';
import { CreateParticipantDto } from './dto/create-participant';
import { MuteParticipantDto } from './dto/mute-participant';
import { UpdateRoleDto } from './dto/update-role';
import { ChatParticipantModel } from "./models/chat_participant.model";

import { AskRoleDto } from './dto/ask-role';
import { AllowLogged } from 'src/auth/auth.decorators';

@Controller('api/chat_participant')
@ApiTags('api/chat_participant')
@UseFilters(HttpExceptionFilter)
export class ChatParticipantsController {
  constructor(private readonly chatParticipantsService: ChatParticipantsService) { }

  @Get()
  @ApiOkResponse({ description: 'Chat participants retrieved successfully', type: ChatParticipantModel, isArray: true })
  public findAll(): Promise<ChatParticipantModel[]> {
    return this.chatParticipantsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chat participant retrieved successfully', type: ChatParticipantModel })
  @ApiNotFoundResponse({ description: 'Chat participant not found' })
  @ApiBadRequestResponse({ description: 'Chat participant validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ChatParticipantModel> {
    return this.chatParticipantsService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Chat participant created successfully', type: ChatParticipantModel })
  @ApiBadRequestResponse({ description: 'Chat participant validation error' })
  public create(@Body() createMessageDto: CreateParticipantDto): Promise<ChatParticipantModel> {
    return this.chatParticipantsService.create(createMessageDto.user_id, createMessageDto.chat_id, createMessageDto.role_id);
  }

  @Post('role/')
  @AllowLogged()
  public async askRole(@Body() askRoleDto: AskRoleDto): Promise<number> {
    return await this.chatParticipantsService.get_role(askRoleDto.participantId, askRoleDto.roomId);
  }

  // @Patch(':id/change_role')
  // @ApiOkResponse({ description: 'New role updated successfully', type: ChatParticipantModel })
  // @ApiBadRequestResponse({ description: 'New role validation error' })
  // public update_role(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<ChatParticipantModel> {
  //   return this.chatParticipantsService.update_role(id, updateRoleDto);
  // }
  @Patch(':id/change_role')
  @ApiOkResponse({ description: 'New role updated successfully', type: ChatParticipantModel })
  @ApiBadRequestResponse({ description: 'New role validation error' })
  public update_role(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<ChatParticipantModel | null> {
    updateRoleDto.participantId = id;
    return this.chatParticipantsService.update_role(updateRoleDto);
  }

  @Patch(':id/mute')
  @ApiOkResponse({ description: 'Mute updated successfully', type: ChatParticipantModel })
  @ApiBadRequestResponse({ description: 'Mute validation error' })
  public mute_participant(@Param('id', ParseIntPipe) id: number, @Body() muteParticipantDto: MuteParticipantDto): Promise<ChatParticipantModel> {
    return this.chatParticipantsService.mute_participant(id, muteParticipantDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Chat participant deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Chat participant not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.chatParticipantsService.delete(id);
  }
}
