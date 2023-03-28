import axios from "axios";
import React from "react";

import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import UserCard from "./UserCard";

interface UserListPageProps {
  loginer: UseLoginDto;
  //   refreshUserInfos: Function;
}

export default function UserListPage({ loginer }: UserListPageProps) {
  let [users, setUsers] = React.useState<UserDto[]>([]);
  // let users: UserDto[] = [
  //   {
  //     id: 1,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  //   {
  //     id: 2,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  //   {
  //     id: 3,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  //   {
  //     id: 4,
  //     login_name: "jjaqueme",
  //     pseudo: "jerome",
  //     color: 10,
  //     avatar_url: ".",
  //     is_admin: false,
  //   },
  // ];

  React.useEffect(() => {
    axios
      .get("/api/users", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data as UserDto[]);

          return;
        }
      })
      .catch((error) => {});
  }, []);

  // React.useEffect(() => {
  //   axios
  //     .get("/api/me/friends", loginer.get_headers())
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data);
  //         // setUsers(res.data as UserDto[]);

  //         return;
  //       }
  //     })
  //     .catch((error) => {});
  // }, []);

  return (
    <>
      <div className="h-full w-full justify-center">
        <div className="flex flex-wrap gap-4">
          {users.map((user) => (
            <div key={user.id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
