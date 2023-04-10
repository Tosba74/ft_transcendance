import { Controller, Request, Res, Header, HttpCode, Param, Body, Get, Post, Patch, Put, Delete, UseFilters, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { UsersService } from './users.service';
import { UserModel } from "./models/user.model";

import { CreateUserDto } from './dto/create-user.dto';


import { AllowLogged } from '../auth/auth.decorators';
import { UserDto } from 'src/_shared_dto/user.dto';

// import { extname } from 'path';
// import { createReadStream } from 'fs';
// import type { Response } from 'express';


@Controller('api/users')
@ApiTags('api/users')
@UseFilters(HttpExceptionFilter)
export class UsersController {

  // constructor(private readonly usersService: UsersService) { }
  constructor(private usersService: UsersService) { }


  /*
      --------- CRUD usual routes ---------
  */

  @AllowLogged()
  @Get()
  @ApiOkResponse({ description: 'Users retrieved successfully', type: UserModel, isArray: true })
  public findAll(@Request() req: any): Promise<UserModel[] | UserDto[]> {


    return this.usersService.findAll(req.user && req.user.is_admin);
  }

  @AllowLogged()
  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully', type: UserModel })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number): Promise<UserModel | UserDto> {

    return this.usersService.findOneById(id, req.user && req.user.is_admin);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserModel })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto.pseudo, createUserDto.login_name, createUserDto.password);
  }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: UpdateUserDto })
  // @ApiNotFoundResponse({ description: 'User not found' })
  // @ApiBadRequestResponse({ description: 'User validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.delete(id);
  }



  /*
      --------- OUR APP additional routes ---------
  */


}
