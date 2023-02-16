import { Controller, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

import { UserStatusService } from './user_status.service';
import { UserStatusModel } from "./models/user_status.model";


@Controller('api/user_status')
@ApiTags('api/user_status')
@UseFilters(HttpExceptionFilter)
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) { }
  
  @Get()
  @ApiOkResponse({ description: 'User status retrieved successfully', type: UserStatusModel, isArray: true})
  public findAll(): Promise<UserStatusModel[]> {
    return this.userStatusService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User status retrieved successfully', type: UserStatusModel })
  @ApiNotFoundResponse({ description: 'User status not found' })
  @ApiBadRequestResponse({ description: 'User status validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<UserStatusModel> {
    return this.userStatusService.findOneById(id);
  }

  // @Post()
  // @ApiCreatedResponse({ description: 'User created successfully', type: UserStatusModel })
  // @ApiBadRequestResponse({ description: 'User validation error' })
  // public create(@Body() createUserDto: CreateUserDto): Promise<UserStatusModel> {
  //   return this.userStatusService.create(createUserDto);
  // }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: UserStatusModel })
  // @ApiNotFoundResponse({ description: 'User not found' })
  // @ApiBadRequestResponse({ description: 'User validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserStatusModel> {
  //   return this.userStatusService.update(id, updateUserDto);
  // }

  // @Delete(':id')
	// @ApiOkResponse({ description: 'Post deleted successfully.'})
	// @ApiNotFoundResponse({ description: 'Post not found.' })
	// public delete(@Param('id', ParseIntPipe) id: number): void {  
	// 	this.userStatusService.delete(id);
	// }

}
