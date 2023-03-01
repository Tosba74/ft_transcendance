
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { LoggedUserDto } from '../dto/logged_user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object
  // we could do a database lookup in our validate() method to extract more information about the user, resulting in a more enriched user object being available in our Request
  // do further token validation, such as looking up the userId in a list of revoked tokens,
  // The model we've implemented here in our sample code is a fast, "stateless JWT" model, where each API call is immediately authorized based on the presence of a valid JWT
  async validate(payload: LoggedUserDto) {

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
