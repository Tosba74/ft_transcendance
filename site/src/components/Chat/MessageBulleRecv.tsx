import { UserDto } from "src/_shared_dto/user.dto";
import ModalUser from "../Friends/ModalUser";
import React from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "./dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";
import { ChatMessageDto } from "src/_shared_dto/chat-message.dto";
import { useNavigate } from "react-router-dom";

interface MessageBulleRecvProps {
  loginer: UseLoginDto;
  user: UserDto;
  chats: UseChatDto;
  gamer: UseGameDto;
  message: ChatMessageDto;
}

export default function MessageBulleRecv({
  loginer,
  user,
  chats,
  gamer,
  message,
}: MessageBulleRecvProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [target, setTarget] = React.useState<any>(undefined);
  const [posX, setPosX] = React.useState(0);
  const [posY, setPosY] = React.useState(0);
  const [clientH, setClientH] = React.useState(0);
  const modalRef = React.useRef<HTMLImageElement | null>(null);
  let innerChat = document.getElementById("innerChat");

  const handleClick = (event: any) => {
    event.preventDefault();
    setTarget(event.target);
    if (innerChat !== null) setClientH(innerChat.clientHeight);
    setIsOpen(true);
    setPosX(35);
    setPosY(event.clientY - 90);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleScroll = (event: any) => {
      event.preventDefault();
      if (isOpen) {
        if (!navigator.userAgent.includes("Firefox") && target === undefined) {
          setIsOpen(false);
        } else {
          setPosY(target.y - 90);
          if (target.y + 90 > clientH || target.y < 175) {
            setIsOpen(false);
          }
        }
      }
    };

    if (isOpen)
      document.getElementById("chat")?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .getElementById("chat")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [target, isOpen, clientH, posY]);

  const navigate = useNavigate();

  return (
    <div className="my-1 flex w-full flex-row-reverse items-end justify-end pl-2">
      <div className="mx-2 break-all rounded-lg bg-gray-300 p-2 px-4 text-xs text-gray-600">
        {(loginer.userInfos &&
          message.invite_id === loginer.userInfos.id &&
          message.invite_game_id !== -1 &&
          message.invite_pseudo !== "" && (
            <>
              {message.sender.pseudo} invited you to play{" "}
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
          )) ||
          (loginer.userInfos &&
            message.invite_id !== loginer.userInfos.id &&
            message.invite_game_id !== -1 &&
            message.invite_pseudo !== "" && (
              <>
                {message.sender.pseudo} invited {message.invite_pseudo} to play{" "}
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
                  Watch
                </button>
              </>
            )) ||
          (loginer.userInfos?.blockeds.indexOf(user.id) !== -1 && (
            <>&lt;Message blocked&gt;</>
          )) || <>{message.content}</>}
      </div>
      {isOpen && (
        <ModalUser
          user={user}
          loginer={loginer}
          chats={chats}
          gamer={gamer}
          modalRef={modalRef}
          posX={posX}
          posY={posY}
          type={null}
          doReload={handleOpen}
        />
      )}
      <img
        src={user.avatar_url}
        alt={user.pseudo}
        title={user.pseudo}
        className="h-6 w-6 min-w-[24px] rounded-full object-cover"
        onClick={handleClick}
      />
    </div>
  );
}
