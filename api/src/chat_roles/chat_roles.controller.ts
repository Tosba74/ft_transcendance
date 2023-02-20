import { Controller, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../_common/filters/http-exception.filter';

import { ChatRolesService } from './chat_roles.service';
import { ChatRoleModel } from "./models/chat_role.model";


@Controller('api/chat_roles')
@ApiTags('api/chat_roles')
@UseFilters(HttpExceptionFilter)
export class ChatRolesController {
  constructor(private readonly chatRolesService: ChatRolesService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Chat roles retrieved successfully', type: ChatRoleModel, isArray: true})
  public findAll(): Promise<ChatRoleModel[]> {
    return this.chatRolesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chat role retrieved successfully', type: ChatRoleModel })
  @ApiNotFoundResponse({ description: 'Chat role not found' })
  @ApiBadRequestResponse({ description: 'Chat role validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ChatRoleModel> {
    return this.chatRolesService.findOneById(id);
  }
}
