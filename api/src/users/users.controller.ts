import { Controller, Param, Body, Get, Post, UseFilters, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserModel } from "./models/user.model";
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

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
  @UseFilters(HttpExceptionFilter)
  @ApiOkResponse({ description: 'User retrieved successfully', type: UserModel })
  @ApiNotFoundResponse({ description: 'User not found' })
  public findOne(@Param('id') id: number): Promise<UserModel | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserModel })
  @ApiUnprocessableEntityResponse({ description: 'User creation error' })
  public create(@Body() createUserDto: CreateUserDto): Promise<UserModel | null> {
    return this.usersService.create(createUserDto);
  }
}
