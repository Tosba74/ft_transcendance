
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';


import { LoggedUserDto } from '../dto/logged_user.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsjwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: LoggedUserDto) {

    if (!payload || payload.id == undefined) {

      throw new WsException('User validation error');
      // throw new UnauthorizedException('User validation error');
    }

    return payload;
  }
}

