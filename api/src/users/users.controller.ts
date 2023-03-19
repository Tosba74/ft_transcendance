import { Controller, HttpCode, Param, Body, Get, Post, Put, Patch, Delete, UseFilters, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus} from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { UsersService } from './users.service';
import { UserModel } from "./models/user.model";

import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePseudoDto } from './dto/update-pseudo.dto';
import { LoggedUserDto } from 'src/auth/dto/logged_user.dto';

import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterModule } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './validation/file-upload.utils';

import { AllowLogged, AllowPublic } from '../auth/auth.decorators';

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
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<LoggedUserDto> {
    return this.usersService.findOneById(id);
  }
  
  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserModel })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }
  
  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: UpdateUserDto })
  // @ApiNotFoundResponse({ description: 'User not found' })
  // @ApiBadRequestResponse({ description: 'User validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
  //   return this.usersService.update(id, updateUserDto);
  // }

  @Patch(':id/change_pseudo')
  @ApiCreatedResponse({ description: 'Pseudo updated successfully', type: UpdatePseudoDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public update_pseudo(@Param('id', ParseIntPipe) id: number, @Body() updatePseudo: UpdatePseudoDto): Promise<UserModel> {
    return this.usersService.updatePseudo(id, updatePseudo);
  }

  @Put(':id/upload_image')
  @AllowLogged()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'src/users/avatars',
        filename: editFileName,
      }),
      limits: {
        fileSize: 1000000
      },
      fileFilter: imageFileFilter,
    }),
  )
  @ApiCreatedResponse({ description: 'Avatar updated successfully', type: UpdatePseudoDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public uploadFileAndPassValidation(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File): Promise<boolean>
  {
    // console.log(file);

    // dans usersService:
    // EFFACER ANCIENNE IMAGE SI LE UPLOAD A PASSER ET A PAS ECRASER L'ANCIEN PATH (car extension differente ?)

    return this.usersService.updateAvatar(id, file.path);
  }
  
  @Delete(':id')
  @HttpCode(204)
	@ApiNoContentResponse({ description: 'Post deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Post not found.' })
	public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {  
		return this.usersService.delete(id);
	}

}
