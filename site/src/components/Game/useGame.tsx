import React from "react";
import { io, Socket } from "socket.io-client";

import { GameDataDto } from "src/_shared_dto/gamedata.dto";
import { GameSetterDto } from "src/_shared_dto/gamesetter.dto";
import { UserDto } from "src/_shared_dto/user.dto";
import { WsResponseDto } from "src/_shared_dto/ws-response.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

import { GameArea } from "./pong";

interface useGameProps {
  loginer: UseLoginDto;
}

const useGame = ({ loginer }: useGameProps) => {
  const gameSocketRef = React.useRef<Socket>();

  const gameArea = React.useRef<GameArea>();

  const [gameId, setGameId] = React.useState(-1);
  const [myGame, setMyGame] = React.useState(false);
  const [amReady, setAmReady] = React.useState(false);
  const [user1, setUser1] = React.useState<UserDto | undefined>(undefined);
  const [user2, setUser2] = React.useState<UserDto | undefined>(undefined);

  const identify = () => {
    // Send identify to register websocket user
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "identify",
        {},
        (response: WsResponseDto<undefined>) => {
          if (response.error !== undefined) {
            console.log("identify error", response.error);
          }
        }
      );
  };

  const createGame = (
    fun_mode: boolean,
    force_fun: boolean,
    points_objective: number,
    force_points: boolean,
    invited_id: number = -1,
    callbackFct: Function | undefined = undefined
  ) => {
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "createGame",
        {
          fun_mode: fun_mode,
          force_fun: force_fun,
          points_objective: points_objective,
          force_points: force_points,
          invited_id: invited_id,
        },
        (response: WsResponseDto<undefined>) => {
          if (response.error === undefined && callbackFct !== undefined) {
            callbackFct();
          }
        }
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
    if (gameId === -1) {
      console.log("You are not inn a game", gameId);
      return;
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
        { game_id: gameId, actions: actions },
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

        gameSocketRef.current &&
          gameSocketRef.current.on(
            "gameInfos",
            ({ game }: { game: GameDataDto }) => {
              gameArea.current?.import(game);
              gameArea.current?.render();

              setUser1(
                (old) =>
                  old && {
                    ...old,
                    status: gameArea.current?.playerOne.ready
                      ? "ready"
                      : "unready",
                  }
              );
              setUser2(
                (old) =>
                  old && {
                    ...old,
                    status: gameArea.current?.playerTwo.ready
                      ? "ready"
                      : "unready",
                  }
              );
            }
          );

        gameSocketRef.current &&
          gameSocketRef.current.on(
            "setGame",
            ({ gameSetter }: { gameSetter: GameSetterDto }) => {
              setUser1(gameSetter.userInfos1);
              setUser2(gameSetter.userInfos2);
              setGameId(gameSetter.game_id);

              setMyGame(
                (loginer.userInfos &&
                  (gameSetter.userInfos1.id === loginer.userInfos.id ||
                    gameSetter.userInfos2.id === loginer.userInfos.id)) ||
                  false
              );
            }
          );
      });
    } //
    else if (loginer.logged === false) {
      console.log("game socket not connected not logged");
    }
  }, [loginer.logged]);

  React.useEffect(() => {
    setAmReady(
      (loginer.userInfos &&
        ((user1 &&
          user1.id === loginer.userInfos.id &&
          gameArea.current?.playerOne.ready) ||
          (user2 &&
            user2.id === loginer.userInfos.id &&
            gameArea.current?.playerTwo.ready))) ||
        false
    );
  }, [user1, user2]);

  return {
    gameArea,
    gameId,
    myGame,
    amReady,
    user1,
    user2,
    identify,
    createGame,
    joinGame,
    playGame,
  };
};

export default useGame;
