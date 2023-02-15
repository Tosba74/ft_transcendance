import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from "@nestjs/passport";
import { Passport42Strategy } from "./passport42.strategy";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, Passport42Strategy]
})
export class AuthModule {

	// app.get('/auth/42',passport.authenticate('42'));

	// app.get('/auth/42/callback',
	// passport.authenticate('42', { failureRedirect: '/login' }),
	// function(req, res) {
	// 	// Successful authentication, redirect home.
	// 	res.redirect('/');
	// });

}
