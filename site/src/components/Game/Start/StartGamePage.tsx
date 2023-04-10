import React from "react";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";
import HistoryGames from "./HistoryGames";
import JoinGame from "./JoinGame";
import QuickPlay from "./QuickPlay";

interface StartGamePageProps {
  loginer: UseLoginDto;
}

export default function StartGamePage({ loginer }: StartGamePageProps) {
  return (
    <div className="mx-auto flex h-max max-w-md flex-col bg-white p-6 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <h1 id="startPage" className="text-2xl">
        Game
      </h1>
      <QuickPlay loginer={loginer} />
      <div className="w-sm mx-auto flex flex-col">
        <JoinGame loginer={loginer} />
        <HistoryGames loginer={loginer} />
      </div>
    </div>
  );
}
