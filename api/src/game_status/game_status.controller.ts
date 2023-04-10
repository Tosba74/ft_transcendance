import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { GameStatusService } from './game_status.service';
import { GameStatusModel } from "./models/game_status.model";


@Controller('api/gameStatus')
@ApiTags('api/gameStatus')
@UseFilters(HttpExceptionFilter)
export class GameStatusController {
  constructor(private readonly gameStatusService: GameStatusService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Game status retrieved successfully', type: GameStatusModel, isArray: true})
  public findAll(): Promise<GameStatusModel[]> {
    return this.gameStatusService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Game status retrieved successfully', type: GameStatusModel })
  @ApiNotFoundResponse({ description: 'Game status not found' })
  @ApiBadRequestResponse({ description: 'Game status validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<GameStatusModel> {
    return this.gameStatusService.findOneById(id);
  }

  // @Post()
  // @ApiCreatedResponse({ description: 'Game status created successfully', type: GameStatusModel })
  // @ApiBadRequestResponse({ description: 'Game status validation error' })
  // public create(@Body() createUserDto: CreateUserDto): Promise<GameStatusModel> {
  //   return this.gameStatusService.create(createUserDto);
  // }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: GameStatusModel })
  // @ApiNotFoundResponse({ description: 'Game status not found' })
  // @ApiBadRequestResponse({ description: 'Game status validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<GameStatusModel> {
  //   return this.gameStatusService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // @HttpCode(204)
	// @ApiNoContentResponse({ description: 'Game status deleted successfully.'})
	// @ApiNotFoundResponse({ description: 'Game status not found.' })
	// public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {  
	// 	return this.gameStatusService.delete(id);
	// }

}
