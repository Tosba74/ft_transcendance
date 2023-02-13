import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

import { UsersService } from '../users.service';
import { UserModel } from "../models/user.model";


@ValidatorConstraint({ async: true })
export class IsLoginNameAlreadyExistConstraint implements ValidatorConstraintInterface {
	constructor(private readonly usersService: UsersService) { }

	validate(login_name: string, args: ValidationArguments): any {
		// if (this.usersService.findByLoginName(login_name) === null)
		// 	return false;
		// return true;
	}
}

export function IsLoginNameAlreadyExist(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsLoginNameAlreadyExistConstraint,
		});
	};
}


@ValidatorConstraint({ async: true })
export class IsPseudoAlreadyExistConstraint implements ValidatorConstraintInterface {
	constructor(private readonly usersService: UsersService) { }

	validate(pseudo: string, args: ValidationArguments):any {

	}
}
  
export function IsPseudoAlreadyExist(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsPseudoAlreadyExistConstraint,
		});
	};
}
