import React from "react";
import { useState, useEffect, useRef } from "react";
import ModalUser from "./ModalUser";

interface UserProps {
  user: {
    id: number;
    login_name: string;
    pseudo: string;
    avatar_url: string;
    is_admin: boolean;
    access_token: null;
    color: number;
    tfa_enabled: boolean;
    status_updated_at: string;
    created_at: string;
    updated_at: string;
    validate_date: null;
    status: string;
  };
  children?: React.ReactNode;
}

export default function User(props: UserProps) {
  const [isOpen, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const modalRef = useRef<HTMLUListElement | null>(null);

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
    <div>
      {props.children}
      <button className="modalRef" onClick={handleClick}>
        {props.user.login_name}
      </button>
      {isOpen && (
        <ModalUser user={props.user} modalRef={modalRef} position={position} />
      )}
    </div>
  );
}
