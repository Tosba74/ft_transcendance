import { Controller, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { ChatTypesService } from './chat_types.service';
import { ChatTypeModel } from "./models/chat_type.model";


@Controller('api/chat_types')
@ApiTags('api/chat_types')
@UseFilters(HttpExceptionFilter)
export class ChatTypesController {
  constructor(private readonly chatTypesService: ChatTypesService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Chat types retrieved successfully', type: ChatTypeModel, isArray: true})
  public findAll(): Promise<ChatTypeModel[]> {
    return this.chatTypesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chat type retrieved successfully', type: ChatTypeModel })
  @ApiNotFoundResponse({ description: 'Chat type not found' })
  @ApiBadRequestResponse({ description: 'Chat type validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ChatTypeModel> {
    return this.chatTypesService.findOneById(id);
  }
}
