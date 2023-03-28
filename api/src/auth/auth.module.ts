
import { Module, forwardRef} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './auth-strategy/local.strategy';
import { JwtStrategy } from './auth-strategy/jwt.strategy';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { WsjwtStrategy } from './auth-strategy/ws.strategy';
import { TfaModule } from 'src/tfa/tfa.module';

@Module({
    imports: [
        UsersModule, PassportModule, forwardRef(() => TfaModule),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }), 
    ],
    providers: [ AuthService, LocalStrategy, JwtStrategy, WsjwtStrategy ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
