import { Controller, Get, Post, Request, UseGuards, Redirect, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Passport42AuthGuard } from './auth/passport42-auth.guard';
import axios from 'axios';

var randomstring = require('randomstring');

const oauth2 = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-92527af718df5ec672ac565eec9bc3dedac11d0dd2feb5091af42ac01ccff32b&redirect_uri=https%3A%2F%2Flocalhost%3A8443%2Fapi%2Flogin&response_type=code';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // lors du click sur 'Continue with 42-profile' button de la page localhost:8443/auth:
  // 1. localhost:8443/auth redirige sur localhost:8443/api/auth
  
  // 2. localhost:8443/api/auth redirige sur oauth2
  @Get('api/auth')
  @Redirect( `${oauth2}` + '&scope=public' + '&state=' + `${randomstring.generate(15)}` )
  auth(): void { }

  // 3. after user grants permission, oauth2 redirige sur localhost:8443/api/login avec un code en queryparam + le random string. Exemple:
  @Get('api/login')
  async login(@Query('code') code: any, @Query('state') state: any): Promise<any> {
    // If the state don't match the state state generated, the request has been created by a third party and the process should be aborted.
    // ... compare random string with state

    // This authorization code is then exchanged for an access token using a server-to-server call from the application to the authorization server.
    const token_request: any = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        client_id: 'u-s4t2ud-92527af718df5ec672ac565eec9bc3dedac11d0dd2feb5091af42ac01ccff32b',
        client_secret: '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',
        code: code,
        redirect_uri: 'https://localhost:8443/api/login',
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
    return datas.data; 
  }

}
