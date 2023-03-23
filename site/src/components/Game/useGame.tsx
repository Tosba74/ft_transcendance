
import React from 'react';
import { io, Socket } from 'socket.io-client';
import { GameArea } from './pong';



interface useGameProps {
  logged: boolean;
  token: string;
}



class GameData {
	started: boolean;
	player1: PlayerDto = new PlayerDto();
	player2: PlayerDto = new PlayerDto();
	ball:	BallDto[] = [];

	constructor() {
		this.started = false;
	}
}


class PlayerDto {
	y: number;
	action: string;
	color:	string;
	height: number;

	constructor() {
		this.y = 0;
		this.action = '';
		this.color = '';
		this.height = 0;
	}
}

class BallDto {
	x: number;
	y: number;
	radius: number;
	xunits: number;
	yunits: number;

	constructor() {
		this.x = 0;
		this.y = 0;
		this.radius = 0;
		this.xunits = 0;
		this.yunits = 0;
	}
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
      gameSocketRef.current.emit("identify", {}, (response: { error: string }) => {

        if (response.error != undefined) {
          console.log('identify error', response.error)

        }
      });
  }



  const createGame = () => {

    console.log('createGame');

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
  }


  const joinGame = (game_id: number) => {

    console.log('joinGame', game_id);

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
  }


  const playGame = (action: string) => {

    gameSocketRef.current &&
      gameSocketRef.current.emit("playGame", { action: action }, (response: void) => {


      });
  }


  // const sendMessage = (messageBody: string, room_id: number) => {

  //   socketRef.current &&
  //     socketRef.current.emit('createMessage', {
  //       room_id: room_id,
  //       message: messageBody,
  //     });
  // };




  React.useEffect(() => {

    if (gameArea.current === undefined)
      gameArea.current = new GameArea();


    if (logged && gameSocketRef.current === undefined) {

      gameSocketRef.current = io('', {
        path: '/socket-game/',
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
          gameSocketRef.current.on("gameInfos", ({ game }: { game: GameData }) => {

            console.log('gameinfos', game);

            gameArea.current?.import(game);




            gameArea.current?.update();
            gameArea.current?.render();
            // console.log('recv msg', room_id, message);

          });


      });

    }
    else {
      console.log('game socket not connected not logged');
    }

  }, [logged]);



  return { gameArea, identify, createGame, joinGame, playGame, setGameDrawFunction }
}

export default useGame;