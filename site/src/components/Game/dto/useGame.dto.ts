import { GameArea } from "../pong";


export interface UseGameDto {
	// rooms: { [key: string]: ChatRoom } | undefined;
    gameArea: React.MutableRefObject<GameArea | undefined>;

    identify: Function;
    createGame: Function;
    joinGame: Function;
    playGame: Function; 

    setGameDrawFunction: Function;
}
