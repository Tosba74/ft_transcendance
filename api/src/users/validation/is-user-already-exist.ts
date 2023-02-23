import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

import { User } from "../user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
export class IsPseudoAlreadyExistConstraint implements ValidatorConstraintInterface {

	// PAS LA BONNE METHODE POUR CHECKER DANS LA DB:
	// [Nest] 581  - 02/13/2023, 11:31:44 PM   ERROR [ExceptionsHandler] Cannot read properties of undefined (reading 'findOne')
	// TypeError: Cannot read properties of undefined (reading 'findOne')
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	  ) { }

	  async validate(pseudo: string, args: ValidationArguments): Promise<boolean> {
		const user: User | null = await this.usersRepository.findOne({
			where: {
				pseudo,
			},
		});	
		return !user;
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
