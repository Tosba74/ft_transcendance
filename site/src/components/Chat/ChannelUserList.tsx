import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "src/_shared_dto/user.dto";

interface UserListProps {
  users: UserDto[];
}

export default function ChannelUserList({ users }: UserListProps) {
  //

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 scrolling-touch mt-2 h-2/3 w-full flex-grow overflow-y-auto py-1 px-4 dark:text-white">
      {users.map((user) => (
        <div key={user.id} className="flex flex-wrap gap-3 p-1">
          <img
            src={user.avatar_url}
            alt="Img"
            className="h-6 w-6 rounded-full object-cover"
          />
          <h2 className="dark:text-white">
            {user.login_name} <small>{user.pseudo}</small>
          </h2>
        </div>
      ))}
    </div>
  );
}
