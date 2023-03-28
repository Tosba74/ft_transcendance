
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ALLOW_LOGGED, ALLOW_PUBLIC } from './auth.decorators';
import { LoggedUserDto } from './dto/logged_user.dto';
import { JwtAuthGuard } from './auth-strategy/jwt-auth.guard';

@Injectable()
export class AppGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super(reflector)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(ALLOW_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    
    const jwtAuthed = await super.canActivate(context);

    const requiredLogged = this.reflector.getAllAndOverride<boolean>(ALLOW_LOGGED, [
        context.getHandler(),
        context.getClass(),
    ]);
    
    const request = context.switchToHttp().getRequest();
    const user = request.user as LoggedUserDto;

    if (jwtAuthed && requiredLogged && user)
    {
      return true;
    }

    if (user && user.is_admin)
    {
      return true;
    }

    return false;
  }
}
