import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../_common/filters/http-exception.filter';

import { FriendsService } from './friends.service';
import { FriendModel } from "./models/friend.model";
import { FriendDto } from './dto/friend.dto';


@Controller('api/friends')
@ApiTags('api/friends')
@UseFilters(HttpExceptionFilter)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Friends retrieved successfully', type: FriendModel, isArray: true})
  public findAll(): Promise<FriendModel[]> {
    return this.friendsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Friend retrieved successfully', type: FriendModel })
  @ApiNotFoundResponse({ description: 'Friend not found' })
  @ApiBadRequestResponse({ description: 'Friend validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<FriendModel> {
    return this.friendsService.findOneById(id);
  }

  @Post(':id')
  @ApiCreatedResponse({ description: 'Friend created successfully', type: FriendModel })
  @ApiBadRequestResponse({ description: 'Friend validation error' })
  public createFriendship(@Param('id', ParseIntPipe) id: number, @Body() friendDto: FriendDto): Promise<FriendModel> {
    return this.friendsService.createFriendship(id, friendDto.friend_id);
  }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: FriendModel })
  // @ApiNotFoundResponse({ description: 'Friend not found' })
  // @ApiBadRequestResponse({ description: 'Friend validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<FriendModel> {
  //   return this.friendsService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @HttpCode(204)
	@ApiNoContentResponse({ description: 'Friend deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Friend not found.' })
	public deleteFriendship(@Param('id', ParseIntPipe) id: number, @Body() friendDto: FriendDto): Promise<void> {  
		return this.friendsService.deleteFriendship(id, friendDto.friend_id);
	}

}
