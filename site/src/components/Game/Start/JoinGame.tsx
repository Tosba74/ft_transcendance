import React from "react";
import { useNavigate } from "react-router-dom";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";
import { UseGameDto } from "../dto/useGame.dto";

export default function JoinGame({
  loginer,
  gamer,
}: {
  loginer: UseLoginDto;
  gamer: UseGameDto;
}) {
  const [idGame, setIdGame] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleClickJoin = (e: any) => {
    e.preventDefault();

    if (idGame) {
      gamer.joinGame(
        idGame,
        () => {
          navigate("/game");
        },
        (err: string) => {
          setError(err);
        }
      );
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleClickJoin}>
      <label
        htmlFor="inputIdGame"
        className="w-sm text-sl pr-4 text-center font-medium text-gray-900 dark:text-white"
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
      <span className=" font-bold text-red-600"> {error} </span>
      <button
        type="submit"
        className="my-2 mx-auto rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Join
      </button>
    </form>
  );
}
