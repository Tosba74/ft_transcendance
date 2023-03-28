
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsAuthGuard extends AuthGuard('wsjwt') {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        return context.switchToWs().getClient().handshake;
    }
}
