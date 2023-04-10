import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { AllowLogged } from 'src/auth/auth.decorators';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { GamesService } from './games.service';
import { GameModel } from "./models/game.model";


@Controller('api/games')
@ApiTags('api/games')
@UseFilters(HttpExceptionFilter)
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Games retrieved successfully', type: GameModel, isArray: true})
  public findAll(): Promise<GameModel[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Game retrieved successfully', type: GameModel })
  @ApiNotFoundResponse({ description: 'Game not found' })
  @ApiBadRequestResponse({ description: 'Game validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<GameModel> {
    return this.gamesService.findOneById(id);
  }



  // @AllowLogged()
  // @Get('recent')
  // @ApiOkResponse({ description: 'Game retrieved successfully', type: GameModel })
  // public recentGames(@Param('id', ParseIntPipe) id: number): Promise<GameModel> {
  //   return this.gamesService.findOneById(id);
  // }



  // @Post()
  // @ApiCreatedResponse({ description: 'Game created successfully', type: GameModel })
  // @ApiBadRequestResponse({ description: 'Game validation error' })
  // public create(@Body() createUserDto: CreateUserDto): Promise<GameModel> {
  //   return this.gamesService.create(createUserDto);
  // }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: GameModel })
  // @ApiNotFoundResponse({ description: 'Game not found' })
  // @ApiBadRequestResponse({ description: 'Game validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<GameModel> {
  //   return this.gamesService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // @HttpCode(204)
	// @ApiNoContentResponse({ description: 'Game deleted successfully.'})
	// @ApiNotFoundResponse({ description: 'Game not found.' })
	// public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {  
	// 	return this.gamesService.delete(id);
	// }

}
