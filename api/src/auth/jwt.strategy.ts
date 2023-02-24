
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


import { LoggedUserDto } from './dto/logged_user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {

    const loggedUser: LoggedUserDto = {
        id: payload.id,
        login_name: payload.login_name,
        pseudo: payload.pseudo,
        avatar_url: payload.avatar_url,
    };
    // return { userId: payload.sub, username: payload.username };

    return loggedUser;
  }
}

