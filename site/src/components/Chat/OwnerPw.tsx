import React, { SyntheticEvent } from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

interface OwnerPwProps {
  sendMessage: Function;
  room: ChatRoomDto | undefined;
}

export default function OwnerPw({ sendMessage, room }: OwnerPwProps) {
  const [addPassword, setAddPassword] = React.useState("");
  const handleAddPassword = (event: SyntheticEvent) => {
    event.preventDefault();
    if (addPassword.length > 0) {
      sendMessage(`/pw ${addPassword}`);
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
      sendMessage(`/pw ${currentPassword} ${newPassword}`);
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

  console.log(room);
  return (
    <div className="w-full py-2">
      {(room?.pw === false && (
        <form onSubmit={handleAddPassword}>
          <label className="mb-2">Add a password</label>
          <div className="flex my-2 h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out focus:outline-none">
            <input
              type="password"
              placeholder="New password"
              value={addPassword}
              onChange={(event) => {
                setAddPassword(event.target.value);
              }}
              className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-14 basis-1/4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
          >
            Change
          </button>
        </form>
      )) || (
        <>
          <form onSubmit={handleUpdatePassword}>
            <label className="">Current password</label>
            <div className="flex my-2 h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out focus:outline-none">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                }}
                className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
              />
            </div>

            <label className="">Set a new password</label>
            <div className="flex my-2 h-full w-full items-center justify-around gap-4 rounded-full shadow-lg transition duration-500 ease-in-out focus:outline-none">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="block my-2 col-span-2 mx-auto mt-3 whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Change
            </button>
          </form>

          <form onSubmit={handleRemovePassword}>
            <label className="">Remove password</label>
            <button
              type="submit"
              className="block my-2 col-span-2 mx-auto mt-3 whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Remove password
            </button>
          </form>

          <div className="text-blue-600 h-1 text-center">{errorMsg}</div>
        </>
      )}
    </div>
  );
}
