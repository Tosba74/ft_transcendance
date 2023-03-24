
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { LoggedUserDto } from '../dto/logged_user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: LoggedUserDto) {

    // lorsque un user modifie ses infos, pour refresh le token avec les nouvelles datas
    const user: LoggedUserDto = await this.usersService.findOneById(payload.id);
    payload.pseudo = user.pseudo;
    payload.avatar_url = user.avatar_url;
    payload.tfa_enabled = user.tfa_enabled;

    // const loggedUser: LoggedUserDto = {
    //     id: payload.id,
    //     login_name: payload.login_name,
    //     pseudo: payload.pseudo,
    //     avatar_url: payload.avatar_url,
    //     is_admin: payload.is_admin,
    // };

    // const loggedUser = payload as LoggedUserDto;
    return payload;
  }
}
