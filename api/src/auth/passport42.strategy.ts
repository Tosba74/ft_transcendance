var passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { FortyTwoStrategy } from "passport-42";
// var FortyTwoStrategy = require('passport-42').Strategy;

passport.use(new FortyTwoStrategy({
	// clientID: FORTYTWO_APP_ID,
	// clientSecret: FORTYTWO_APP_SECRET,
	clientID: 'u-s4t2ud-92527af718df5ec672ac565eec9bc3dedac11d0dd2feb5091af42ac01ccff32b',
	clientSecret: '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',
	callbackURL: "http://127.0.0.1:3000/auth/42/callback"
  },
//   function(accessToken: string, refreshToken: string, profile: any, cb: any) {
// 	User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
// 	  return cb(err, user);
// 	});
//   }
));


@Injectable()
export class Passport42Strategy extends PassportStrategy(FortyTwoStrategy) {


}
