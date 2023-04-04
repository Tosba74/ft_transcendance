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
    <div className="p-4">
      {users.map((user) => (
        <div className="flex flex-wrap gap-3 p-1">
          <img
            src={user.avatar_url}
            alt="Img"
            className="h-6 w-6 rounded-full object-cover"
          />
          <h2 className="">
            <Link to="#">
              {user.login_name} <small>{user.pseudo}</small>
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
