import { Controller, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

import { FriendTypesService } from './friend_types.service';
import { FriendTypeModel } from "./models/friend_type.model";


@Controller('api/friend_types')
@ApiTags('api/friend_types')
@UseFilters(HttpExceptionFilter)
export class FriendTypesController {
  constructor(private readonly friendTypesService: FriendTypesService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Friend types retrieved successfully', type: FriendTypeModel, isArray: true})
  public findAll(): Promise<FriendTypeModel[]> {
    return this.friendTypesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Friend type retrieved successfully', type: FriendTypeModel })
  @ApiNotFoundResponse({ description: 'Friend type not found' })
  @ApiBadRequestResponse({ description: 'Friend type validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<FriendTypeModel> {
    return this.friendTypesService.findOneById(id);
  }
}
