import React from "react";
import { io, Socket } from "socket.io-client";

import { GameDataDto } from "src/_shared_dto/gamedata.dto";
import { GameSetterDto } from "src/_shared_dto/gamesetter.dto";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

import { GameArea } from "./pong";

interface useGameProps {
  loginer: UseLoginDto;
}

const useGame = ({ loginer }: useGameProps) => {
  const gameSocketRef = React.useRef<Socket>();
  let game_id = -1;

  const gameArea = React.useRef<GameArea>();

  let user1: UserDto | undefined;
  let user2: UserDto | undefined;

  const identify = () => {
    // Send identify to register websocket user
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "identify",
        {},
        (response: { error: string }) => {
          if (response.error != undefined) {
            console.log("identify error", response.error);
          }
        }
      );
  };

  const inviteGame = (invited_id: number) => {
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "inviteGame",
        { invited_id: invited_id },
        (response: void) => {}
      );
  };

  const joinGame = (game_id: number) => {
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "joinGame",
        { game_id: game_id },
        (response: void) => {}
      );
  };

  const playGame = (actions: string[]) => {
    if (game_id === -1) {
      console.log("You are not inn a game");
    }
    //
    if (
      loginer.userInfos === undefined ||
      (user1?.id !== loginer.userInfos.id && user2?.id !== loginer.userInfos.id)
    ) {
      console.log("You are not the MC");
    }

    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "sendAction",
        { game_id: game_id, actions: actions },
        (response: void) => {}
      );
  };

  React.useEffect(() => {
    if (gameArea.current === undefined) gameArea.current = new GameArea();

    if (loginer.logged && gameSocketRef.current === undefined) {
      gameSocketRef.current = io("", {
        path: "/socket-game/",
        // transports: ["websocket"],
        timeout: 10000,
        extraHeaders: {
          Authorization: `Bearer ${loginer.token}`,
        },
      });

      gameSocketRef.current.on("connect", () => {
        console.log("game connected! front-end");

        // Send authorization header to authentify socket
        identify();

        // Bind function for message reception
        gameSocketRef.current &&
          gameSocketRef.current.on(
            "gameInfos",
            ({ game }: { game: GameDataDto }) => {
              gameArea.current?.import(game);
              gameArea.current?.render();
            }
          );

        gameSocketRef.current &&
          gameSocketRef.current.on(
            "setGame",
            ({ gameSetter }: { gameSetter: GameSetterDto }) => {
              user1 = gameSetter.userInfos1;
              user2 = gameSetter.userInfos2;
              game_id = gameSetter.game_id;

              console.log(`enter game ${game_id} with dd ${user1}  ${user2}`);
            }
          );
      });
    } else {
      console.log("game socket not connected not logged");
    }
  }, [loginer.logged]);

  return {
    gameArea,
    identify,
    inviteGame,
    joinGame,
    playGame,
  };
};

export default useGame;
