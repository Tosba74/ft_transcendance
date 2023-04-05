import { GameArea } from "../pong";

export interface UseGameDto {
  // rooms: { [key: string]: ChatRoom } | undefined;
  gameArea: React.MutableRefObject<GameArea | undefined>;

  identify: Function;
  inviteGame: Function;
  joinGame: Function;
  playGame: Function;
}
