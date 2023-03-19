import { Module } from '@nestjs/common';
import { TfaService } from './tfa.service';
import { TfaController } from './tfa.controller';

import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, AuthModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }), 
    ],
    providers: [TfaService,],
    controllers: [TfaController,],
})
export class TfaModule { }