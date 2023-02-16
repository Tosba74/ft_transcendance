import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { UserModel } from '../users/models/user.model';
import { UserStatusModel } from '../user_status/models/user_status.model';

const config: PostgresConnectionOptions = {
	type: "postgres",
	host: "postgres",
	port: 5432,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DB,

	synchronize: false,
	logging: false,

	entities: [UserStatusModel, UserModel],
	migrations: ['dist/typeorm/migrations/*.js'],
	subscribers: [],
}

export default config;