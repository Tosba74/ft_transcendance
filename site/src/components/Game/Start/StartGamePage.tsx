import React from "react";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";
import { UseGameDto } from "../dto/useGame.dto";
import HistoryGames from "./HistoryGames";
import JoinGame from "./JoinGame";
import QuickPlay from "./QuickPlay";

interface StartGamePageProps {
  loginer: UseLoginDto;
  gamer: UseGameDto;
}

export default function StartGamePage({ loginer, gamer }: StartGamePageProps) {
  return (
    <div className="mx-auto flex h-max max-w-md flex-col bg-white py-6 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <h1 id="startPage" className="text-2xl">
        Game
      </h1>
      <QuickPlay loginer={loginer} gamer={gamer} />
      <div className="w-sm mx-auto flex flex-col">
        <JoinGame loginer={loginer} gamer={gamer} />
        <HistoryGames loginer={loginer} />
      </div>
    </div>
  );
}
