
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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

  async validate(payload: any): Promise<LoggedUserDto> {

    if (!payload || payload.id == undefined) {
      throw new UnauthorizedException('User validation error');
    }

    // lorsque un user modifie ses infos, pour refresh le token avec les nouvelles datas
    const user: LoggedUserDto = await this.usersService.findOneById(payload.id, true) as LoggedUserDto;

    // const loggedUser: LoggedUserDto = {
    //     id: payload.id,
    //     login_name: payload.login_name,
    //     pseudo: payload.pseudo,
    //     avatar_url: payload.avatar_url,
    //     is_admin: payload.is_admin,
    // };

    // const loggedUser = payload as LoggedUserDto;
    return user;
  }
}
