import ModalLink from "./ModalLink";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface ModalProps {
  type: string;
  loginer: UseLoginDto;
  user: UserDto;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  position: number;
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

function handleRemove(loginer: UseLoginDto, user: UserDto) {
  axios
    .delete(`/api/me/friends/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 204) {
        console.log(res);
        return;
      }
    })
    .catch((error) => {});

  console.log("should rm " + user.login_name + "(" + user.id + ")");
}

function handleAdd(loginer: UseLoginDto, user: UserDto) {
  axios
    .post(
      `/api/me/friends/${user.id}`,
      { friend_id: user.id },
      loginer.get_headers()
    )
    .then((res) => {
      if (res.status === 201) {
        console.log(res.data);
        return;
      }
    })
    .catch((error) => {});
  console.log("should add" + user.login_name + "(" + user.id + ")");
}

function handleAccept(loginer: UseLoginDto, user: UserDto) {
  // axios
  //   .post(`/api/me/friends/${user.id}`, { friend_id: user.id }, loginer.get_headers())
  //   .then((res) => {
  //     if (res.status === 201) {
  //       console.log(res.data);
  //       return;
  //     }
  //   })
  //   .catch((error) => {});
  console.log(
    "should accept " +
      user.login_name +
      "(" +
      user.id +
      ")" +
      " from pending list"
  );
}

function handleBlock(loginer: UseLoginDto, user: UserDto) {
  axios
    .post(
      `/api/me/blockeds/${user.id}`,
      { blocked_id: user.id },
      loginer.get_headers()
    )
    .then((res) => {
      if (res.status === 201) {
        // console.log(res.data);
        return;
      }
    })
    .catch((error) => {});
  handleRemove(loginer, user);
}

function handleUnblock(loginer: UseLoginDto, user: UserDto) {
  axios
    .delete(`/api/me/blockeds/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 204) {
        // console.log(res);
        return;
      }
    })
    .catch((error) => {});
  console.log("should unblock" + user.login_name + "(" + user.id + ")");
}

export default function ModalUser({
  type,
  loginer,
  user,
  modalRef,
  position,
}: ModalProps) {
  const navigate = useNavigate();
  let content;

  if (type === "friend") {
    content = (
      <>
        <ModalLink onClick={() => handleView(navigate, user)}>View</ModalLink>
        <ModalLink onClick={() => handleMP(loginer, user)}>MP</ModalLink>
        <ModalLink onClick={() => handlePlay(loginer, user)}>Play</ModalLink>
        <ModalLink onClick={() => handleRemove(loginer, user)}>
          Remove
        </ModalLink>
        <ModalLink onClick={() => handleBlock(loginer, user)}>Block</ModalLink>
      </>
    );
  } else if (type === "ask") {
    content = (
      <>
        <ModalLink onClick={() => handleView(navigate, user)}>View</ModalLink>
        <ModalLink onClick={() => handleMP(loginer, user)}>MP</ModalLink>
        <ModalLink onClick={() => handlePlay(loginer, user)}>Play</ModalLink>
        <ModalLink onClick={() => handleAccept(loginer, user)}>
          Accept
        </ModalLink>
        <ModalLink onClick={() => handleBlock(loginer, user)}>Block</ModalLink>
      </>
    );
  } else if (type === "ban") {
    content = (
      <>
        <ModalLink onClick={() => handleView(navigate, user)}>View</ModalLink>
        <ModalLink onClick={() => handleMP(loginer, user)}>MP</ModalLink>
        <ModalLink onClick={() => handlePlay(loginer, user)}>Play</ModalLink>
        <ModalLink onClick={() => handleUnblock(loginer, user)}>
          Unblock
        </ModalLink>
      </>
    );
  } else {
    content = (
      <>
        <ModalLink onClick={() => handleView(navigate, user)}>View</ModalLink>
        <ModalLink onClick={() => handleMP(loginer, user)}>MP</ModalLink>
        <ModalLink onClick={() => handlePlay(loginer, user)}>Play</ModalLink>
        <ModalLink onClick={() => handleAdd(loginer, user)}>Add</ModalLink>
        <ModalLink onClick={() => handleBlock(loginer, user)}>Block</ModalLink>
      </>
    );
  }
  return (
    <div
      ref={modalRef}
      style={{ left: position + "px" }}
      className="absolute flex flex-col bg-white text-center text-black drop-shadow-md dark:bg-gray-700 dark:text-white"
    >
      {content}
    </div>
  );
}
