import { Controller, Param, Body, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { UserModel } from "./models/user.model";
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOkResponse({ description: 'Users retrieved successfully' })
  public findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public findOne(@Param('id') id: number): Promise<UserModel | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiUnprocessableEntityResponse({ description: 'User creation error' })
  public create(@Body() createUserDto: CreateUserDto): Promise<UserModel | null> {
    return this.usersService.create(createUserDto);
  }

}
