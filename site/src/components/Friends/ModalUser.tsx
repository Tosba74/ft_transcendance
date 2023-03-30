import ModalLink from "./ModalLink";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import React from "react";
import { useEffect } from "react";
import axios from "axios";

interface ModalProps {
  loginer: UseLoginDto;
  user: UserDto;
  modalRef: React.MutableRefObject<HTMLUListElement | null>;
  position: number;
}

function handleView(loginer: UseLoginDto, user: UserDto) {
  console.log("view profile " + user.login_name + "(" + user.id + ")");
}

function handleMP(loginer: UseLoginDto, user: UserDto) {
  console.log("should mp " + user.login_name + "(" + user.id + ")");
}

function handlePlay(loginer: UseLoginDto, user: UserDto) {
  console.log("should invite to play " + user.login_name + "(" + user.id + ")");
}

function handleRemove(loginer: UseLoginDto, user: UserDto) {
  // /api/me/friends/{id}
  axios
    .delete(`/api/me/friends/${user.id}`, loginer.get_headers())
    .then((res) => {
      if (res.status === 204) {
        // console.log(res.data);
        // setUsers(res.data as UserDto[]);

        return;
      }
    })
    .catch((error) => {});

  console.log("should rm " + user.login_name + "(" + user.id + ")");
}

function handleAdd(loginer: UseLoginDto, user: UserDto) {
  console.log("should add" + user.login_name + "(" + user.id + ")");
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
        console.log(res.data);
        // setUsers(res.data as UserDto[]);

        return;
      }
    })
    .catch((error) => {});

  console.log("should block " + user.login_name + "(" + user.id + ")");
}

export default function ModalUser({
  loginer,
  user,
  modalRef,
  position,
}: ModalProps) {
  // const handleSubmit = async (event: SyntheticEvent) => {
  //   event.preventDefault();

  //   // if (tfa === false) {
  //   axios
  //     .post("/api/login/create", {
  //       username: loginName,
  //       password: password,
  //     })
  //     .then((res) => {
  //       if (res.status == 201) {
  //         setPageMessage("Creation successful, redirecting...");
  //       } //
  //     })
  //     .catch(() => setPageMessage("Login error"));
  //   // }
  // };

  return (
    <ul
      ref={modalRef}
      style={{ left: position + "px" }}
      className="absolute bg-white py-1 px-3 text-black drop-shadow-md"
    >
      <ModalLink onClick={() => handleView(loginer, user)}>View</ModalLink>
      <ModalLink onClick={() => handleMP(loginer, user)}>MP</ModalLink>
      <ModalLink onClick={() => handlePlay(loginer, user)}>Play</ModalLink>
      <ModalLink onClick={() => handleAdd(loginer, user)}>Add</ModalLink>
      <ModalLink onClick={() => handleRemove(loginer, user)}>Remove</ModalLink>
      <ModalLink onClick={() => handleBlock(loginer, user)}>Block</ModalLink>
    </ul>
  );
}
