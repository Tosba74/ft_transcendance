import React from "react";
import { useState, useEffect, useRef } from "react";
import ModalUser from "./ModalUser";
import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface UserProps {
  user: UserDto;
  children?: React.ReactNode;
  loginer: UseLoginDto;
  type: string;
}

export default function User(props: UserProps) {
  const [isOpen, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: any) => {
    setOpen(true);
    setPosition(event.clientX);
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
        {props.user.login_name}
      </button>
      {isOpen && (
        <ModalUser
          type={props.type}
          loginer={props.loginer}
          user={props.user}
          modalRef={modalRef}
          position={position}
        />
      )}
    </>
  );
}
