import React from "react";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";

export default function JoinGame({ loginer }: { loginer: UseLoginDto }) {
  const [idGame, setIdGame] = React.useState("");

  const handleClickJoin = () => {
    if (idGame)
      console.log(
        "hello " +
          loginer.userInfos?.pseudo +
          " wants to join game " +
          idGame +
          " "
      );
  };

  return (
    <>
      <label
        htmlFor="inputIdGame"
        className="w-sm text-sl pr-4 text-left font-medium text-gray-900 dark:text-white"
      >
        ID Game
      </label>
      <input
        id="inputIdGame"
        type="text"
        name="inputIdGame"
        className="w-sm mx-auto rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={"42"}
        onChange={(e) => setIdGame(e.target.value)}
        required
      />
      <button
        onClick={handleClickJoin}
        className="my-2 mx-auto rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Join
      </button>
    </>
  );
}
