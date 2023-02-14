import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserModel } from './src/users/models/user.model';

const config: PostgresConnectionOptions = {
	type: "postgres",
	host: "postgres",
	port: 5432,
	username: "user",
	password: "password",
	database: "test_db",
	synchronize: true,
	logging: false,
	entities: [UserModel],
	migrations: [],
	subscribers: [],
}

export default config;