
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ALLOW_PUBLIC, ALLOW_LOGGED } from './auth.decorators';
import { LoggedUserDto } from './dto/logged_user.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
       /* console.log('enter');

        const isPublic = this.reflector.getAllAndOverride<boolean>(ALLOW_PUBLIC, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            console.log('public');
            return true;
        }

        const requiredLogged = this.reflector.getAllAndOverride<boolean>(ALLOW_LOGGED, [
            context.getHandler(),
            context.getClass(),
        ]);

        // const user: LoggedUserDto | undefined = context.switchToHttp().getRequest().user;
        const request = context.switchToHttp().getRequest();
        const user = request.user as LoggedUserDto; //Use passport authentication strategy
        console.log(user);

        // console.log(context.switchToHttp().getRequest());
        // console.log(user);

        if (requiredLogged && user) {
            console.log('logged');
            return true;
        }
        
        if (user && user.id == 1) {
            console.log('admin');
            return true;
        }

        return false;*/


        // return requiredRoles.some((role) => user?.roles?.includes(role));

        // console.log(context);

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user);

        return super.canActivate(context);
    }

}
