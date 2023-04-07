import React from "react";
import { io, Socket } from "socket.io-client";
import { GameDataDto } from "./dto/gamedata.dto";
import { GameArea } from "./pong";

interface useGameProps {
  logged: boolean;
  token: string;
}

const useGame = ({ logged, token }: useGameProps) => {
  const gameSocketRef = React.useRef<Socket>();
  let gameId = -1;

  const gameArea = React.useRef<GameArea>();
  // let gameArea: GameArea = new GameArea();

  let [gameDrawFunction, setGameDrawFunction] = React.useState<Function>();

  const identify = () => {
    // Send identify to register websocket user
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "identify",
        {},
        (response: { error: string }) => {
          if (response.error !== undefined) {
            console.log("identify error", response.error);
          }
        }
      );
  };

  const createGame = () => {
    console.log("createGame");

    // // Try to connect to a room, receive room name and messages on success
    gameSocketRef.current &&
      gameSocketRef.current.emit("createGame", {}, (response: void) => {
        // if (response.error == undefined && response.value) {
        //   let room: ChatRoom = response.value;
        //   console.log('connected', room.id);
        //   setRooms(oldRooms => ({
        //     ...oldRooms,
        //     [room.id]: room,
        //   }));
        // }
      });
  };

  const joinGame = (game_id: number) => {
    console.log("joinGame", game_id);

    // // Try to connect to a room, receive room name and messages on success
    gameSocketRef.current &&
      gameSocketRef.current.emit("joinGame", {}, (response: void) => {
        // if (response.error == undefined && response.value) {
        //   let room: ChatRoom = response.value;
        //   console.log('connected', room.id);
        //   setRooms(oldRooms => ({
        //     ...oldRooms,
        //     [room.id]: room,
        //   }));
        // }
      });
  };

  const playGame = (actions: string[]) => {
    gameSocketRef.current &&
      gameSocketRef.current.emit(
        "sendAction",
        { actions: actions },
        (response: void) => {}
      );
  };

  React.useEffect(() => {
    if (gameArea.current === undefined) gameArea.current = new GameArea();

    if (logged && gameSocketRef.current === undefined) {
      gameSocketRef.current = io("", {
        path: "/socket-game/",
        // transports: ["websocket"],
        timeout: 10000,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
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
      });
    } else {
      console.log("game socket not connected not logged");
    }
  }, [logged]);

  return {
    gameArea,
    identify,
    createGame,
    joinGame,
    playGame,
    setGameDrawFunction,
  };
};

export default useGame;
