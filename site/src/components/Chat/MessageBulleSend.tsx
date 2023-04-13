import { useNavigate } from "react-router-dom";
import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";

interface MessageBulleSendProps {
  user: UserDto;
  gamer: UseGameDto;
  message: ChatMessageDto;
}

export default function MessageBulleSend({
  user,
  gamer,
  message,
}: MessageBulleSendProps) {
  const navigate = useNavigate();

  return (
    <div className="my-1 flex w-full items-end justify-end pr-2">
      <div className="mx-2 break-all rounded-lg bg-cyan-500 p-2 px-4 text-xs text-white ">
        {(message.invite_id !== -1 &&
          message.invite_game_id !== -1 &&
          message.invite_pseudo !== "" && (
            <>
              You invited {message.invite_pseudo} to play{" "}
              <button
                onClick={() => {
                  gamer.joinGame(
                    message.invite_game_id,
                    () => {
                      navigate("/game");
                    },
                    undefined
                  );
                }}
                className="rounded bg-green-400 p-1"
              >
                Play
              </button>
            </>
          )) || <>{message.content}</>}
      </div>
      <img
        src={user.avatar_url}
        alt={user.pseudo}
        title={user.pseudo}
        className="order-2 h-6 w-6 min-w-[24px] rounded-full object-cover"
      />
    </div>
  );
}
