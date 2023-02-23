import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../_common/filters/http-exception.filter';

import { ChatMessagesService } from './chat_messages.service';
import { ChatMessageModel } from "./models/chat_message.model";
import { CreateMessageDto } from './dto/create-message';


@Controller('api/chat_messages')
@ApiTags('api/chat_messages')
@UseFilters(HttpExceptionFilter)
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Chat messages retrieved successfully', type: ChatMessageModel, isArray: true})
  public findAll(): Promise<ChatMessageModel[]> {
    return this.chatMessagesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Chat message retrieved successfully', type: ChatMessageModel })
  @ApiNotFoundResponse({ description: 'Chat message not found' })
  @ApiBadRequestResponse({ description: 'Chat message validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ChatMessageModel> {
    return this.chatMessagesService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Chat message created successfully', type: ChatMessageModel })
  @ApiBadRequestResponse({ description: 'Chat message validation error' })
  public create(@Body() createMessageDto: CreateMessageDto): Promise<ChatMessageModel> {
    return this.chatMessagesService.create(createMessageDto);
  }

  @Delete(':id')
  @HttpCode(204)
	@ApiNoContentResponse({ description: 'Chat message deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Chat message not found.' })
	public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {  
		return this.chatMessagesService.delete(id);
	}

}
