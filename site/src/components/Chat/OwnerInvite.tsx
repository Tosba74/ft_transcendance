import React, { SyntheticEvent } from "react";
import axios from "axios";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ParticipantDto } from "src/_shared_dto/participant.dto";

interface OwnerCommandsProps {
  loginer: UseLoginDto;
  sendMessage: Function;
  participants: ParticipantDto[];
}

export default function OwnerInvite({
  loginer,
  sendMessage,
  participants,
}: OwnerCommandsProps) {
  const [users, setUsers] = React.useState<ParticipantDto[]>([]);

  const [invite, setInvite] = React.useState("");

  React.useEffect(() => {
    axios
      .get("/api/users", loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          const allUsers = res.data as ParticipantDto[];
          setUsers(
            allUsers.filter((value) => {
              return (
                participants.find((parti) => {
                  return parti.id === value.id;
                }) === undefined
              );
            })
          );

          return;
        }
      })
      .catch((error) => {});
  }, [participants]);

  const handleClickInvite = (event: SyntheticEvent) => {
    event.preventDefault();
    if (invite.length > 0) {
      sendMessage(`/invite ${invite}`);
      setInvite("");
    }
  };

  return (
    <div className="w-full py-2">
      <label className="">Invite user</label>
      <div className="flex my-2 h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
        <select
          defaultValue={""}
          onChange={(event) => {
            setInvite(event.target.value);
          }}
          className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
        >
          <option id="defaultOption" key={-1} value="">
            Pseudo
          </option>
          ;
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.pseudo}
              </option>
            );
          })}
        </select>

        <button className="block my-2 col-span-2 mx-auto mt-3 whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClickInvite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-1 h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
