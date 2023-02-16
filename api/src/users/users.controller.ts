import { Controller, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

import { UsersService } from './users.service';
import { UserModel } from "./models/user.model";

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
@ApiTags('api/users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Users retrieved successfully', type: UserModel, isArray: true})
  public findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully', type: UserModel })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.usersService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserModel })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'Password updated successfully', type: UpdateUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
	@ApiOkResponse({ description: 'Post deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Post not found.' })
	public delete(@Param('id', ParseIntPipe) id: number): void {  
		this.usersService.delete(id);
	}

}
