import React, { SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import axios from "axios";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ParticipantDto } from "src/_shared_dto/participant.dto";
import { UseChatDto } from "./dto/useChat.dto";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

import OwnerInvite from "./OwnerInvite";
import OwnerPw from "./OwnerPw";

const startEL = document.getElementById("root");

interface OwnerCommandsProps {
  loginer: UseLoginDto;
  sendMessage: Function;
  participants: ParticipantDto[];
  role: string;
  room: ChatRoomDto | undefined;
}

export default function OwnerCommands({
  loginer,
  sendMessage,
  participants,
  role,
  room,
}: OwnerCommandsProps) {
  const [portal, setPortal] = React.useState(false);
  const [effect, setEffect] = React.useState(false);

  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleClickPortal = (event: SyntheticEvent) => {
    event.preventDefault();
    setEffect(true);
    setPortal(true);
  };

  React.useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref) {
        if (portal && !ref.current?.contains(e.target)) {
          setEffect(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [portal]);

  return (
    <>
      <button className="pl-1" onClick={handleClickPortal}>
        - <span className="hover:underline">{role} settings</span>
		{/* <svg style={{color: "white"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-1 inline-block h-6 w-6" viewBox="0 0 16 16"> <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" fill="white"></path> </svg> */}
        <svg
          className="ml-1 inline-block h-6 w-6 relative -top-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 12h-2V5H4v13.385L5.763 17H12v2H6.455L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v8zm-7.855 7.071a4.004 4.004 0 0 1 0-2.142l-.975-.563 1-1.732.976.563A3.996 3.996 0 0 1 17 14.126V13h2v1.126c.715.184 1.353.56 1.854 1.071l.976-.563 1 1.732-.975.563a4.004 4.004 0 0 1 0 2.142l.975.563-1 1.732-.976-.563c-.501.51-1.14.887-1.854 1.071V23h-2v-1.126a3.996 3.996 0 0 1-1.854-1.071l-.976.563-1-1.732.975-.563zM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </g>
        </svg>
      </button>

      {portal &&
        startEL !== null &&
        createPortal(
          <div
            ref={ref}
            className={classNames(
              "absolute left-1/2 top-1/2 z-50 min-w-[250px] -translate-x-1/2 -translate-y-1/2 items-center rounded-lg bg-gray-100 p-6 dark:bg-gray-800 dark:text-white shadow-lg",
              effect ? "opacity-1 animate-fadeIn" : "animate-fadeOut opacity-0"
            )}
            onAnimationEnd={() => {
              if (!effect) setPortal(false);
            }}
          >
            <h3 className="text-center text-xl">Owner settings</h3>

            {(room?.type === 3 && (
              <OwnerInvite
                loginer={loginer}
                sendMessage={sendMessage}
                participants={participants}
              />
            )) ||
              (room?.type === 2 && (
                <OwnerPw sendMessage={sendMessage} room={room} />
              ))}
          </div>,
          startEL
        )}
    </>
  );
}
