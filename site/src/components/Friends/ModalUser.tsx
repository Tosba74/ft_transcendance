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
import classNames from "classnames";
import { ParticipantDto } from "src/_shared_dto/participant.dto";

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
        loginer.getUserData();
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
        loginer.getUserData();
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
        loginer.getUserData();
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
        doReload();
        loginer.getUserData();
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
      // <ModalLink key={`modalUserPlay-${user.id}`} onClick={() => handlePlay()}>
      //   Play
      // </ModalLink>,
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
      // <ModalLink key={`modalUserPlay-${user.id}`} onClick={() => handlePlay()}>
      //   Play
      // </ModalLink>,
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
      // <ModalLink key={`modalUserPlay-${user.id}`} onClick={() => handlePlay()}>
      //   Play
      // </ModalLink>,
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
  } else if (type === "chat") {
    content.push(
      <ModalLink
        key={`modalUserKick-${user.id}`}
        onClick={() => handleKick(loginer, user, doReload)}
      >
        Kick
      </ModalLink>,
      (user as ParticipantDto).roleName !== "ban" ? (
        <ModalLink
          key={`modalUserBan-${user.id}`}
          onClick={() => handleBan(loginer, user, doReload)}
        >
          Ban
        </ModalLink>
      ) : (
        <ModalLink
          key={`modalUserUnban-${user.id}`}
          onClick={() => handleUnban(loginer, user, doReload)}
        >
          Unban
        </ModalLink>
      ),
      <ModalLink
        key={`modalUserMute-${user.id}`}
        onClick={() => handleMute(loginer, user, doReload)}
      >
        Mute 10min
      </ModalLink>,
      <ModalLink
        key={`modalUserUnmute-${user.id}`}
        onClick={() => handleUnmute(loginer, user, doReload)}
      >
        Unmute
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
      <ModalLink key={`modalUserPlay-${user.id}`} onClick={() => handlePlay()}>
        Play
      </ModalLink>
      // <ModalLink
      //   key={`modalUserAdd-${user.id}`}
      //   onClick={() => handleAdd(loginer, user, doReload)}
      // >
      //   Add
      // </ModalLink>,
      // <ModalLink
      //   key={`modalUserBlock-${user.id}`}
      //   onClick={() => handleBlock(loginer, user, doReload)}
      // >
      //   Block
      // </ModalLink>
    );
  }

  const startEL = document.getElementById("root");
  const startRef = React.useRef<HTMLDivElement | null>(null);

  const [portalStrat, setPortalStrat] = React.useState(false);
  const [effect, setEffect] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [mode, setMode] = React.useState<modeGame>({
    isFun: false,
    points: 10,
    force: true,
  });

  const handlePlay = () => {
    setPortalStrat(true);
    setEffect(true);
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

  const handleKick = (
    loginer: UseLoginDto,
    user: UserDto,
    doReload: Function
  ) => {
    chats.sendMessage(`/kick ${user.id}`, chats.currChannel);
  };

  const handleBan = (
    loginer: UseLoginDto,
    user: UserDto,
    doReload: Function
  ) => {
    chats.sendMessage(`/ban ${user.id}`, chats.currChannel);
  };

  const handleUnban = (
    loginer: UseLoginDto,
    user: UserDto,
    doReload: Function
  ) => {
    chats.sendMessage(`/unban ${user.id}`, chats.currChannel);
  };

  const handleMute = (
    loginer: UseLoginDto,
    user: UserDto,
    doReload: Function
  ) => {
    chats.sendMessage(`/mute ${user.id}`, chats.currChannel);
  };

  const handleUnmute = (
    loginer: UseLoginDto,
    user: UserDto,
    doReload: Function
  ) => {
    chats.sendMessage(`/unmute ${user.id}`, chats.currChannel);
  };

  const handleClickSearch = () => {
    setEffect(false);

    gamer.createGame(
      mode.isFun,
      true,
      mode.points,
      mode.force,
      user.id,
      (game_id: number) => {
        chats.sendMessage(
          `/gameinvite ${user.id} ${game_id}`,
          chats.currChannel
        );
        navigate("/game");
        setIsSearch(true);
      }
    );
  };

  React.useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (modalRef || startRef) {
        if (!portalStrat && !modalRef.current?.contains(e.target)) {
          doReload();
        } else if (portalStrat && !startRef.current?.contains(e.target)) {
          setPortalStrat(false);
          doReload();
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [portalStrat, doReload, modalRef]);

  return (
    <>
      {
        <div
          ref={modalRef}
          style={{ left: posX + "px", top: posY + "px" }}
          className="absolute z-[100] flex flex-col bg-white text-center text-black drop-shadow-md dark:bg-gray-700 dark:text-white"
        >
          {content}
        </div>
      }
      {portalStrat &&
        startEL !== null &&
        createPortal(
          <div
            ref={startRef}
            className={classNames(
              "absolute left-1/2 top-1/2 z-[100] grid w-auto min-w-[250px] max-w-md -translate-x-1/2 -translate-y-1/2 grid-cols-2 items-center gap-2 rounded-lg bg-gray-100 p-4 px-16 shadow-lg dark:bg-gray-700 dark:text-white",
              effect ? "opacity-1 animate-fadeIn" : "animate-fadeOut opacity-0"
            )}
            onAnimationEnd={() => {
              if (!effect) {
                doReload();
                setPortalStrat(false);
              }
              if (isSearch && !effect) navigate("/game");
            }}
          >
            <h3 className="col-span-2 text-center text-xl">Option</h3>

            <label className="relative right-2 ml-auto cursor-pointer">
              <input
                onChange={handleFun}
                type="checkbox"
                className="peer sr-only place-self-center"
                defaultChecked={mode.isFun}
              />
              <div className="peer h-6 w-11 place-self-center rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
            </label>
            <span className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              Fun mode
            </span>

            <label className="relative right-2 ml-auto cursor-pointer">
              <input
                onChange={handleForce}
                type="checkbox"
                className="peer sr-only"
                defaultChecked={mode.force}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
            </label>

            <span className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              Force points
            </span>

            <input
              min="3"
              max="10"
              defaultValue={mode.points}
              className="right-0 ml-auto mr-2 max-w-[55px] rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="number"
              onChange={handlePoints}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Score
            </label>

            <button
              onClick={handleClickSearch}
              className="col-span-2 mx-auto mt-3 whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search Game
            </button>
          </div>,
          startEL
        )}
    </>
  );
}
