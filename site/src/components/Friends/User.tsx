import React from "react";
import { useState, useEffect, useRef } from "react";
import ModalUser from "./ModalUser";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { UseGameDto } from "../Game/dto/useGame.dto";

interface UserProps {
  user: UserDto;
  loginer: UseLoginDto;
  gamer: UseGameDto;
  children?: React.ReactNode;
  chats: UseChatDto;
  type: string;
  doReload: Function;
}

export default function User(props: UserProps) {
  const [isOpen, setOpen] = useState(false);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: any) => {
    setOpen(true);
    setPosX(event.clientX);
    setPosY(event.clientY);
    // console.log(event);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (modalRef) {
        if (isOpen && !modalRef.current?.contains(e.target)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <>
      {props.children}
      <button className="modalRef" onClick={handleClick}>
        {props.user.pseudo}
      </button>
      {isOpen && (
        <ModalUser
          type={props.type}
          loginer={props.loginer}
          chats={props.chats}
          gamer={props.gamer}
          user={props.user}
          modalRef={modalRef}
          posX={posX}
          posY={posY}
          doReload={props.doReload}
        />
      )}
    </>
  );
}
