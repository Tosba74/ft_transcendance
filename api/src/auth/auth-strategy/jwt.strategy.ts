
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../../users/users.service';


import { LoggedUserDto } from '../dto/logged_user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly  usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

   // isTfa allows to distinguish between tokens created with and without two-factor authentication
  async validate(payload: LoggedUserDto) {
    // console.log('validate');
    // console.log(payload);
    // const user = await this.usersService.findOneById(payload.id);
    
    // if (!user.tfa_enabled) {
    //   console.log('NO TFA');
    //   return user;
    // }
    // console.log(payload.is_tfa);

    if (payload.is_tfa) {
      console.log('AUTH WITH TFA');
      return payload;
    }

    // if (payload.is_tfa === true)
    //   console.log('TFA');

    // const loggedUser: LoggedUserDto = {
    //     id: payload.id,
    //     login_name: payload.login_name,
    //     pseudo: payload.pseudo,
    //     avatar_url: payload.avatar_url,
    //     is_admin: payload.is_admin,
    // };

    // const loggedUser = payload as LoggedUserDto;

    // console.log('NO TFA');
    return payload;
  }
}
