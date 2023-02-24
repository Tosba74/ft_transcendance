
/*

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('passlogged');

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user)
        return true;

    return false;
  }
}*/
