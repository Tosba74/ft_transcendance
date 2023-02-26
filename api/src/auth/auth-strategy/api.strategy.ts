
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoggedUserDto } from '../dto/logged_user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiStrategy extends PassportStrategy(Strategy, 'api') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'code',
      passwordField: 'code',
    });
  }
  //Mandatory fields are code (and code)

  async validate(code: string, code2: string): Promise<LoggedUserDto> {
    const api_uid = process.env.API_UID;
    const api_secret = process.env.API_SECRET;

    console.log(api_uid, api_secret);

    //exchange code for access_token

    //get user infos

    const login = 'player'; 

    const user = await this.authService.validateOrCreateUser(login);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}