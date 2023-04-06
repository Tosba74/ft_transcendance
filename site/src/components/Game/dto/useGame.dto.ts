import { UserDto } from "src/_shared_dto/user.dto";
import { GameArea } from "../pong";

export interface UseGameDto {
  // rooms: { [key: string]: ChatRoom } | undefined;
  gameArea: React.MutableRefObject<GameArea | undefined>;

  gameId: number;
  myGame: boolean;
  amReady: boolean;
  user1: UserDto | undefined;
  user2: UserDto | undefined;

  identify: Function;
  inviteGame: Function;
  joinGame: Function;
  playGame: Function;
}
