import ModalLink from "./ModalLink";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useContext } from "react";

interface ModalProps {
  type: string | null;
  loginer: UseLoginDto;
  user: UserDto;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  posX: number;
  posY: number;
  doReload: Function;
}

function handleView(navigate: NavigateFunction, user: UserDto) {
  navigate("/players/" + user.id);
}

function handleMP(loginer: UseLoginDto, user: UserDto) {
  console.log("should mp " + user.login_name + "(" + user.id + ")");
}

function handlePlay(loginer: UseLoginDto, user: UserDto) {
  console.log("should invite to play " + user.login_name + "(" + user.id + ")");
}

function handleRemove(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  axios
    .delete(`/api/me/friends/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 204) {
        doReload();
        // console.log(res);
        return;
      }
    })
    .catch((error) => {});

  // console.log("should rm " + user.login_name + "(" + user.id + ")");
}

function handleAdd(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  axios
    .post(`/api/me/friends/${user.id}`, {}, loginer.get_headers())
    .then((res) => {
      if (res.status === 201) {
        doReload();
        // console.log(res.data);
        return;
      }
    })
    .catch((error) => {});
  // console.log("should add" + user.login_name + "(" + user.id + ")");
}

function handleAccept(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  handleAdd(loginer, user, doReload);
  // console.log(
  //   "should accept " +
  //     user.login_name +
  //     "(" +
  //     user.id +
  //     ")" +
  //     " from pending list"
  // );
}

function handleBlock(loginer: UseLoginDto, user: UserDto, doReload: Function) {
  axios
    .post(`/api/me/blockeds/${user.id}`, {}, loginer.get_headers())
    .then((res) => {
      if (res.status === 201) {
        // console.log(res.data);
        // doReload(); Not needed if handleRemove
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
  // console.log("should unblock" + user.login_name + "(" + user.id + ")");
}

export default function ModalUser({
  type,
  loginer,
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
        onClick={() => handleMP(loginer, user)}
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
        onClick={() => handleMP(loginer, user)}
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
        onClick={() => handleMP(loginer, user)}
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
        onClick={() => handleMP(loginer, user)}
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
  return (
    <div
      ref={modalRef}
      style={{ left: posX + "px", top: posY + "px" }}
      className="absolute z-[100] flex flex-col bg-white text-center text-black drop-shadow-md dark:bg-gray-700 dark:text-white"
    >
      {content}
    </div>
  );
}
