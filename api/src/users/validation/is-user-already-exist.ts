import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

import { UserModel } from "../models/user.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
export class IsLoginNameAlreadyExistConstraint implements ValidatorConstraintInterface {

	// PAS LA BONNE METHODE POUR CHECKER DANS LA DB:
	// [Nest] 581  - 02/13/2023, 11:31:44 PM   ERROR [ExceptionsHandler] Cannot read properties of undefined (reading 'findOne')
	// TypeError: Cannot read properties of undefined (reading 'findOne')
	constructor(
		@InjectRepository(UserModel)
		private readonly usersRepository: Repository<UserModel>,
	  ) { }

	  async validate(login_name: string, args: ValidationArguments): Promise<boolean> {
		const user: UserModel | null = await this.usersRepository.findOne({
			where: {
				login_name,
			},
		});	
		return !user;
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


// @ValidatorConstraint({ async: true })
// export class IsPseudoAlreadyExistConstraint implements ValidatorConstraintInterface {
// 	constructor(private readonly usersService: UsersService) { }

// 	validate(pseudo: string, args: ValidationArguments):any {
// 		// ...
// 	}
// }
  
// export function IsPseudoAlreadyExist(validationOptions?: ValidationOptions) {
// 	return function (object: Object, propertyName: string) {
// 		registerDecorator({
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			options: validationOptions,
// 			constraints: [],
// 			validator: IsPseudoAlreadyExistConstraint,
// 		});
// 	};
// }
