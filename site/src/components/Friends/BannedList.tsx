import User from "./User";
import React from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

function handleUnblock(user: UserDto) {
  console.log("should remove " + user?.login_name + " from ban list");
}

export default function BannedList({ loginer }: { loginer: UseLoginDto }) {
  let [users, setUsers] = React.useState<UserDto[]>([]);

  React.useEffect(() => {
    axios
      .get("/api/me/blockeds", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data as UserDto);
          setUsers(res.data as UserDto[]);

          return;
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <h2 className="text-2xl">Banned list</h2>
      <ul className="mb-4 pl-1">
        {users.map((user) => {
          return (
            <li key={user.id} className="text-slate-500 line-through">
              <User user={user}>
                <MdClose
                  onClick={() => handleUnblock(user)}
                  className="inline-block cursor-pointer"
                />
              </User>
            </li>
          );
        })}
      </ul>
    </>
  );
}
