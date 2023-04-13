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
      <div className="my-2 h-full w-full items-center justify-around gap-4 rounded-full transition duration-500 ease-in-out focus:outline-none">
        <select
          defaultValue={""}
          onChange={(event) => {
            setInvite(event.target.value);
          }}
          className="w-full mx-auto rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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

        <button
          className="col-span-2 my-2 mx-auto mt-3 block whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleClickInvite}
        >
          Invite
        </button>
      </div>
    </div>
  );
}
