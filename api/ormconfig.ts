import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './src/users/user.entity';

const config: PostgresConnectionOptions = {
	type: "postgres",
	host: "postgres",
	port: 5432,
	username: "user",
	password: "password",
	database: "test_db",
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
}

export default config;