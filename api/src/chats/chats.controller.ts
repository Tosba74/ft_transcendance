import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { ChatsService } from './chats.service';
import { ChatModel } from "./models/chat.model";

import { CreateChatDto } from './dto/create-chat.dto';


@Controller('api/chats')
@ApiTags('api/chats')
@UseFilters(HttpExceptionFilter)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Chats retrieved successfully', type: ChatModel, isArray: true})
  public findAll(): Promise<ChatModel[]> {
    return this.chatsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chat retrieved successfully', type: ChatModel })
  // @ApiNotFoundResponse({ description: 'Chat not found' })
  @ApiBadRequestResponse({ description: 'Chat validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ChatModel> {
    return this.chatsService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Chat created successfully', type: ChatModel })
  @ApiBadRequestResponse({ description: 'Chat validation error' })
  public create(@Body() createChatDto: CreateChatDto): Promise<ChatModel> {
    return this.chatsService.create(createChatDto);
  }

  @Delete(':id')
  @HttpCode(204)
	@ApiNoContentResponse({ description: 'Chat deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Chat not found.' })
	public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {  
		return this.chatsService.delete(id);
	}

}
 