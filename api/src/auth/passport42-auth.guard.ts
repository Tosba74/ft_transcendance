import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class Passport42AuthGuard extends AuthGuard('42') { }
