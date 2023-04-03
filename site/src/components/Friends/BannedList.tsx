import User from "./User";
import React from "react";
import axios from "axios";
import { FiUserX } from "react-icons/fi";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

export default function BannedList({ loginer }: { loginer: UseLoginDto }) {
  const [users, setUsers] = React.useState<UserDto[]>([]);

  const handleUnblock = (user: UserDto) => {
    axios
      .delete(`/api/me/blockeds/${user.id}`, loginer.get_headers())
      .then((res) => {
        if (res.status === 204) {
          // console.log(res);
          return;
        }
      })
      .catch((error) => {});
    // console.log(
    //   "should remove " +
    //     user.login_name +
    //     "(" +
    //     user.id +
    //     ")" +
    //     " from ban list"
    // );
  };

  React.useEffect(() => {
    axios
      .get("/api/me/blockeds", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data as UserDto[]);
          setUsers(res.data as UserDto[]);

          return;
        }
      })
      .catch((error) => {});
  }, []);

  const content: JSX.Element[] = users.map((user) => (
    <li className="flex items-center text-slate-500" key={user.id}>
      <User type={"ban"} loginer={loginer} user={user}>
        <FiUserX
          onClick={() => handleUnblock(user)}
          className="mr-1 inline-block cursor-pointer text-black dark:text-white"
        />
      </User>
    </li>
  ));

  return (
    <>
      {content.length > 0 && (
        <>
          <h2 className="text-2xl">Banned list</h2>
          <ul className="mb-4 pl-1">{content}</ul>
        </>
      )}
    </>
  );
}
