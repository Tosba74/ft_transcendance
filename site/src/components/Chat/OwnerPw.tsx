import React, { SyntheticEvent } from "react";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

// import * as bcrypt from 'bcrypt';

interface OwnerPwProps {
  sendMessage: Function;
  room: ChatRoomDto | undefined;
}

export default function OwnerPw({ sendMessage, room }: OwnerPwProps) {
  
  function hashPw(password: string): string {
	
	// return /\s/.test(password); // checkk space

	const bcrypt = require('bcrypt');
	const saltRounds: number = 10;
	const hash: string = bcrypt.hash(password, saltRounds);
	return hash;
  }

  const [addPassword, setAddPassword] = React.useState("");
  const handleAddPassword = (event: SyntheticEvent) => {
    event.preventDefault();
    if (addPassword.length > 0) {
	  hashPw(newPassword);
      sendMessage(`/pw ${hashPw(newPassword)}`);
      setAddPassword("");
    }
  };

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const [newPassword, setNewPassword] = React.useState("");
  const handleUpdatePassword = (event: SyntheticEvent) => {
    event.preventDefault();
    if (currentPassword.length === 0) {
      setErrorMsg("Current password is missing");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else if (currentPassword.length > 0 && newPassword.length > 0) {
	  hashPw(newPassword);
      sendMessage(`/pw ${currentPassword} ${hashPw(newPassword)}`);
      setCurrentPassword("");
      setNewPassword("");
      setErrorMsg("");
    }
  };

  const handleRemovePassword = (event: SyntheticEvent) => {
    event.preventDefault();
    if (currentPassword.length === 0) {
      setErrorMsg("Current password is missing");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else if (currentPassword.length > 0) {
      sendMessage(`/pw ${currentPassword}`);
      setCurrentPassword("");
      setErrorMsg("");
    }
  };

  return (
    <div className="w-full py-2">
      {(room?.pw === false && (
        <form onSubmit={handleAddPassword}>
          <label className="mb-2">Add a password</label>
          <div className="my-2 flex h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out focus:outline-none">
            <input
              type="password"
              placeholder="New password"
              value={addPassword}
              onChange={(event) => {
                setAddPassword(event.target.value);
              }}
              className="mx-auto w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 my-2 mx-auto mt-3 block whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Change
          </button>
        </form>
      )) || (
        <>
          <form onSubmit={handleUpdatePassword}>
            <label className="">Current password</label>
            <div className="my-2 flex h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out focus:outline-none">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                }}
                className="mx-auto w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <label className="">Set a new password</label>
            <div className="my-2 flex h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out focus:outline-none">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                className="mx-auto w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="col-span-2 my-2 mx-auto mt-3 block whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Change
            </button>
          </form>

          <form onSubmit={handleRemovePassword}>
            <label className="">Remove password</label>
            <button
              type="submit"
              className="col-span-2 my-2 mx-auto mt-3 block whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Remove password
            </button>
          </form>

          <div className="h-1 text-center text-blue-600">{errorMsg}</div>
        </>
      )}
    </div>
  );
}
