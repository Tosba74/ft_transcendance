import { Controller, Param, Body, Get, Post, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

import { UserModel } from "./models/user.model";
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Controller('api/users')
@ApiTags('api/users')
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
  public findOne(@Param('id') id: number): Promise<UserModel | null> {
    return this.usersService.findOne(id);

    // const user: Promise<UserModel | null> = this.usersService.findOne(id);
    // user.then(
    //   function(value:UserModel) {
    //     if (value === null) 
    //       throw new NotFoundException('User not found.');
    //   }
    // );
    // return user;
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserModel })
  @ApiUnprocessableEntityResponse({ description: 'User creation error' })
  public create(@Body() createUserDto: CreateUserDto): Promise<UserModel | null> {
    return this.usersService.create(createUserDto);
  }
}
