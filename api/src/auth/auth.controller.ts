import { Controller, Get, Post, Request, UseGuards, Redirect, Query, Body, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/user.entity';

// import { Passport42AuthGuard } from './auth/passport42-auth.guard';

const oauth2 = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-92527af718df5ec672ac565eec9bc3dedac11d0dd2feb5091af42ac01ccff32b&redirect_uri=https%3A%2F%2Flocalhost%3A8443%2Fapi%2Fsignup2&response_type=code';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // lors du click sur 'Continue with 42-profile' button de la page localhost:8443/auth:
  // 1. localhost:8443/auth redirige sur localhost:8443/api/signup
  
  // 2. localhost:8443/api/signup redirige sur $oauth2
  @Post('api/signup')
  @Redirect()
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {

	// if user not exists create a user with createUserDto
	// CHECK IF USER EXISTS
	var randomstring = require('randomstring');
	var state: string = randomstring.generate(15);
	createUserDto.state = state;
	this.authService.createUser(createUserDto);

	const url = `${oauth2}` + '&scope=public' + '&state=' + `${state}`;
	return { statusCode: HttpStatus.FOUND, url };
  }

  // 3. after user grants permission, oauth2 redirige sur localhost:8443/api/signup2 avec un code en queryparam + le random string
  @Get('api/signup2')
  async signup42(@Query('code') code: any, @Query('state') state: any): Promise<any> {

    // This authorization code is then exchanged for an access token using a server-to-server call from the application to the authorization server.
    const token_request: any = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        client_id: 'u-s4t2ud-92527af718df5ec672ac565eec9bc3dedac11d0dd2feb5091af42ac01ccff32b',
        client_secret: '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',
        code: code,
        redirect_uri: 'https://localhost:8443/api/signup2',
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });

    // This access token is used by the client to make API calls.
    const access_token: string = token_request.data.access_token;
  
    const datas: any = await axios.get('https://api.intra.42.fr/v2/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

	// If the state don't match the randomstring generated, the request has been created by a third party and the process should be aborted.
	const user: User = await this.authService.findOne(state);
    // COMPARE STATE WITH THE RANDOMSTRING FROM THE DB
	// if (User === null)
	// 	return null;
	const id: number = user.id;
	const updateUserDto: UpdateUserDto = new UpdateUserDto();
	updateUserDto.token = access_token;
	this.authService.updateUser(id, updateUserDto);

    return "thank you" 	// PROVISOIRE
  }
  
}
