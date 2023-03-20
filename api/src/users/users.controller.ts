import { Controller, Request, Res, Header, HttpCode, Param, Body, Get, Post, Patch, Put, Delete, UseFilters, ParseIntPipe, UseInterceptors, UploadedFile, StreamableFile} from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { UsersService } from './users.service';
import { UserModel } from "./models/user.model";

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePseudoDto } from './dto/update-pseudo.dto';

import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from './validation/file-upload.utils';
import { extname } from 'path';

import { createReadStream } from 'fs';
import type { Response } from 'express';

import { AllowLogged } from '../auth/auth.decorators';

@Controller('api/users')
@ApiTags('api/users')
@UseFilters(HttpExceptionFilter)
export class UsersController {

  // constructor(private readonly usersService: UsersService) { }
  constructor(private usersService: UsersService) { }
  

  /* 
      --------- CRUD usual routes ---------
  */

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
  
  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: UpdateUserDto })
  // @ApiNotFoundResponse({ description: 'User not found' })
  // @ApiBadRequestResponse({ description: 'User validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
  //   return this.usersService.update(id, updateUserDto);
  // }
  
  @Delete(':id')
  @HttpCode(204)
	@ApiNoContentResponse({ description: 'Post deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Post not found.' })
	public delete(@Param('id', ParseIntPipe) id: number): Promise<void> {  
		return this.usersService.delete(id);
	}



  /* 
      --------- OUR APP additional routes ---------
  */

  // @Get('public_profile')
  // @AllowLogged()
  // public getPublicProfile(@Request() req: any) {
  //     // return this.usersService.getPublicProfile(req.user.id);
  // }

  // @Get('private_profile')
  // @AllowLogged()
  // public getPrivateProfile(@Request() req: any) {
  //     // return this.usersService.getPrivateProfile(req.user.id);
  // }

  @Patch('update_pseudo')
  @AllowLogged()
  @ApiCreatedResponse({ description: 'Pseudo updated successfully', type: UpdatePseudoDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User validation error' })
  public update_pseudo(@Request() req: any, @Body() updatePseudo: UpdatePseudoDto): Promise<boolean> {
    return this.usersService.updatePseudo(req.user.id, updatePseudo);
  }

  @Get('avatar')
  @AllowLogged()
  @ApiCreatedResponse({ description: 'Avatar retrieved successfully', type: UserModel })
  getFile(@Request() req: any, @Res({ passthrough: true }) res: Response): StreamableFile {

    // rajouter encore check si image existe sur server, sinon garder image de 42
    
    const path = req.user.avatar_url;
    const extension: string = extname(path);

    res.set({'Content-Type': `image/${extension}`});

    const file = createReadStream(path, {encoding: "base64"});
    return new StreamableFile(file);
  }

  // mettre les images a part ou un volume et donner l'accès direct avec nginx, et comme ça on peut juste stocker l'url dans le model du user
  @Put('upload_image')
  @AllowLogged()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: '../app-datas/avatars',
        filename: (req: any, file, cb) => {
            cb(null, req.user.id + extname(file.originalname));
        },
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
  public uploadFileAndPassValidation(@Request() req: any, @UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.usersService.updateAvatar(req.user.id, file.filename);
  }

}
