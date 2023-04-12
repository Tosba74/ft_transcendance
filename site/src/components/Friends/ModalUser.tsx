import ModalLink from "./ModalLink";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ChannelDto } from "src/_shared_dto/channel.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";
import React from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  type: string | null;
  loginer: UseLoginDto;
  chats: UseChatDto;
  gamer: UseGameDto;
  user: UserDto;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  posX: number;
  posY: number;
  doReload: Function;
}

interface modeGame {
  isFun: boolean;
  points: number;
  force: boolean;
}

function handleView(navigate: NavigateFunction, user: UserDto) {
  navigate("/players/" + user.id);
}

function handleMP(loginer: UseLoginDto, user: UserDto, chats: UseChatDto) {
  axios
    .get(`/api/me/chats/conversation/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 200) {
        const chat = res.data as ChannelDto;
        chats.connectRoom(chat.id);
        return;
      }
    })
    .catch((error) => {});
}

function handleRemove(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  axios
    .delete(`/api/me/friends/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 204) {
        doReload();
        return;
      }
    })
    .catch((error) => {});
}

function handleAdd(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  axios
    .post(`/api/me/friends/${user.id}`, {}, loginer.get_headers())
    .then((res) => {
      if (res.status === 201) {
        doReload();
        return;
      }
    })
    .catch((error) => {});
}

function handleAccept(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  handleAdd(loginer, user, doReload);
}

function handleBlock(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  axios
    .post(`/api/me/blockeds/${user.id}`, {}, loginer.get_headers())
    .then((res) => {
      if (res.status === 201) {
        handleRemove(loginer, user, doReload);
        return;
      }
    })
    .catch((error) => {});
}

function handleUnblock(
  loginer: UseLoginDto,
  user: UserDto,
  doReload: Function
) {
  axios
    .delete(`/api/me/blockeds/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 204) {
        console.log(res);
        doReload();
        return;
      }
    })
    .catch((error) => {});
}

export default function ModalUser({
  type,
  loginer,
  chats,
  gamer,
  user,
  modalRef,
  posX,
  posY,
  doReload,
}: ModalProps) {
  const navigate = useNavigate();
  let content = [
    <ModalLink
      key={`modalUserView-${user.id}`}
      onClick={() => handleView(navigate, user)}
    >
      View
    </ModalLink>,
  ];

  if (type === "friend") {
    content.push(
      <ModalLink
        key={`modalUserMP-${user.id}`}
        onClick={() => handleMP(loginer, user, chats)}
      >
        MP
      </ModalLink>,
      <ModalLink
        key={`modalUserPlay-${user.id}`}
        onClick={() => handlePlay(loginer, user)}
      >
        Play
      </ModalLink>,
      <ModalLink
        key={`modalUserRemove-${user.id}`}
        onClick={() => handleRemove(loginer, user, doReload)}
      >
        Remove
      </ModalLink>,
      <ModalLink
        key={`modalUserBlock-${user.id}`}
        onClick={() => handleBlock(loginer, user, doReload)}
      >
        Block
      </ModalLink>
    );
  } else if (type === "ask") {
    content.push(
      <ModalLink
        key={`modalUserMP-${user.id}`}
        onClick={() => handleMP(loginer, user, chats)}
      >
        MP
      </ModalLink>,
      <ModalLink
        key={`modalUserPlay-${user.id}`}
        onClick={() => handlePlay(loginer, user)}
      >
        Play
      </ModalLink>,
      <ModalLink
        key={`modalUserAccept-${user.id}`}
        onClick={() => handleAccept(loginer, user, doReload)}
      >
        Accept
      </ModalLink>,
      <ModalLink
        key={`modalUserRemove-${user.id}`}
        onClick={() => handleRemove(loginer, user, doReload)}
      >
        Remove
      </ModalLink>,
      <ModalLink
        key={`modalUserBlock-${user.id}`}
        onClick={() => handleBlock(loginer, user, doReload)}
      >
        Block
      </ModalLink>
    );
  } else if (type === "sent") {
    content.push(
      <ModalLink
        key={`modalUserMP-${user.id}`}
        onClick={() => handleMP(loginer, user, chats)}
      >
        MP
      </ModalLink>,
      <ModalLink
        key={`modalUserPlay-${user.id}`}
        onClick={() => handlePlay(loginer, user)}
      >
        Play
      </ModalLink>,
      <ModalLink
        key={`modalUserRemove-${user.id}`}
        onClick={() => handleRemove(loginer, user, doReload)}
      >
        Remove
      </ModalLink>,
      <ModalLink
        key={`modalUserBlock-${user.id}`}
        onClick={() => handleBlock(loginer, user, doReload)}
      >
        Block
      </ModalLink>
    );
  } else if (type === "ban") {
    content.push(
      <ModalLink
        key={`modalUserUnBlock-${user.id}`}
        onClick={() => handleUnblock(loginer, user, doReload)}
      >
        Unblock
      </ModalLink>
    );
  } else {
    content.push(
      <ModalLink
        key={`modalUserMP-${user.id}`}
        onClick={() => handleMP(loginer, user, chats)}
      >
        MP
      </ModalLink>,
      <ModalLink
        key={`modalUserPlay-${user.id}`}
        onClick={() => handlePlay(loginer, user)}
      >
        Play
      </ModalLink>,
      <ModalLink
        key={`modalUserAdd-${user.id}`}
        onClick={() => handleAdd(loginer, user, doReload)}
      >
        Add
      </ModalLink>,
      <ModalLink
        key={`modalUserBlock-${user.id}`}
        onClick={() => handleBlock(loginer, user, doReload)}
      >
        Block
      </ModalLink>
    );
  }

  const startEL = document.getElementById("root");

  const [effect, setEffect] = React.useState(false);
  const [portalStrat, setPortalStrat] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [mode, setMode] = React.useState<modeGame>({
    isFun: false,
    points: 10,
    force: true,
  });

  const handlePlay = (loginer: UseLoginDto, user: UserDto) => {
    setPortalStrat(true);
    console.log(
      "should invite to play " + user.login_name + "(" + user.id + ")"
    );
  };

  const handleFun = (e: any) => {
    setMode((old) => {
      return { ...old, isFun: e.target.checked };
    });
  };

  const handleForce = (e: any) => {
    setMode((old) => {
      return { ...old, force: e.target.checked };
    });
  };

  const handlePoints = (e: any) => {
    if (!e.target.valueAsNumber) {
      setMode((old) => {
        return { ...old, points: 10 };
      });
    } else {
      setMode((old) => {
        return { ...old, points: e.target.valueAsNumber };
      });
    }
  };

  const handleClickSearch = () => {
    setEffect(false);

    gamer.createGame(mode.isFun, true, mode.points, mode.force, -1, () => {
      setIsSearch(true);
    });
  };

  return (
    <>
      {!portalStrat && (
        <div
          ref={modalRef}
          style={{ left: posX + "px", top: posY + "px" }}
          className="absolute z-[100] flex flex-col bg-white text-center text-black drop-shadow-md dark:bg-gray-700 dark:text-white"
        >
          {content}
        </div>
      )}
      {portalStrat &&
        startEL !== null &&
        createPortal(
          <div className="absolute left-1/2 top-1/2 z-[100] grid w-auto min-w-[250px] max-w-md -translate-x-1/2 -translate-y-1/2 grid-cols-2 items-center gap-2 rounded-lg bg-gray-100 p-4 px-16 shadow-lg dark:bg-gray-700 dark:text-white">
            <button
              onClick={() => {
                console.log("should print msg");
              }}
            >
              test
            </button>
          </div>,
          startEL
        )}
    </>
  );
}
