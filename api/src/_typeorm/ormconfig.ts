import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { UserModel } from 'src/users/models/user.model';
import { UserStatusModel } from 'src/user_status/models/user_status.model';
import { FriendTypeModel } from 'src/friend_types/models/friend_type.model';
import { FriendModel } from 'src/friends/models/friend.model';

import { ChatTypeModel } from 'src/chat_types/models/chat_type.model';
import { ChatRoleModel } from 'src/chat_roles/models/chat_role.model';
import { ChatModel } from 'src/chats/models/chat.model';

const config: PostgresConnectionOptions = {
	type: "postgres",
	host: "postgres",
	port: 5432,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DB,

	synchronize: false,
	logging: false,

	entities: [ UserStatusModel, UserModel, FriendTypeModel, FriendModel, 
		ChatTypeModel, ChatRoleModel, ChatModel
	],
	migrations: ['dist/_typeorm/migrations/*.js'],
	subscribers: [],
}

export default config;