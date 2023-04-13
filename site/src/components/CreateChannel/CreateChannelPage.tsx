import { UseLoginDto } from "../Log/dto/useLogin.dto";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type } from "os";

interface CreateChannelPageProps {
  loginer: UseLoginDto;
}

export default function CreateChannelPage({ loginer }: CreateChannelPageProps) {
  const [pageMessage, setPageMessage] = React.useState("");

  const [typePP, setType] = React.useState(false);
  const [channelName, setChannelName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const typeHandler = () => {
    setType((typePP) => !typePP);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (channelName.length == 0) setPageMessage("Name cannot be empty");
    else {
      axios
        .post(
          "/api/me/chats/create",
          {
            name: channelName,
            password: password,
            type_id: typePP ? 3 : 2,
          },
          loginer.get_headers()
        )
        .then((res) => {
          if (res.status == 201) {
            setPageMessage("Channel created, redirecting...");
            navigate("/channels");
          } //
        })
        .catch(() => setPageMessage("Create Channel error"));
      // }
    }
  };

  return (
    <div className="mx-auto flex h-max max-w-[600px] flex-col bg-white p-20 py-6 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <h1 className="pb-4 text-center text-3xl">Create Channel</h1>
      <form>
        <div className="mb-6 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="pp"
              type="checkbox"
              onChange={typeHandler}
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Private
          </label>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Name"
            required
          />
        </div>
        {typePP === false && (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="w-36 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
        <div className="mt-3 h-6 text-center text-sm">{pageMessage}</div>
      </form>
    </div>
  );
}
