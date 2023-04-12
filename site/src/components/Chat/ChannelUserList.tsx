import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ParticipantDto } from "src/_shared_dto/participant.dto";
import { UserDto } from "src/_shared_dto/user.dto";

interface UserListProps {
  users: ParticipantDto[];
}

export default function ChannelUserList({ users }: UserListProps) {
  //

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 scrolling-touch mt-2 h-2/3 w-full flex-grow overflow-y-auto py-1 px-4 dark:text-white">
      {users.map((user) => (
        <div className="flex flex-wrap gap-3 p-1">
          <img
            src={user.avatar_url}
            alt="Img"
            className="h-6 w-6 rounded-full object-cover"
          />
          <h2
            className={classNames(
              "dark:text-white",
              user.roleName === "ban" && "font-bold text-red-500"
            )}
          >
            <Link to="#">
              {user.login_name}{" "}
              <small>{user.roleName !== "user" && user.roleName}</small>
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
