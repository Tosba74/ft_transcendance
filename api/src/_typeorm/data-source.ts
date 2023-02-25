import { DataSource, DataSourceOptions } from "typeorm";
import config from './ormconfig'

const AppDataSource = new DataSource({
	type: config.type,
	host: config.host,
	port: config.port,
	username: config.username,
	password: config.password,
	database: config.database,

	synchronize: config.synchronize,
	logging: config.logging,

	entities: config.entities,
	migrations: config.migrations,
});

export default AppDataSource;


//yarn migration:generate src/typeorm/migrations/UserStatus
//yarn migration:run