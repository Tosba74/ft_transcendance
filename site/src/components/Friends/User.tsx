import React from "react";
import { useState, useEffect, useRef } from "react";

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
  // const modalRef = useRef(document.querySelector(".modalRef"));
  const modalRef = useRef(document.createElement("div"));

  const handleClick = (event: any) => {
    setOpen(!isOpen);
    setPosition(event.clientX);
    modalRef.current = event.target;
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // console.log(modalRef.current);
      // console.log(e.target);
      // console.log(modalRef.current !== e.target);
      console.log(modalRef.current.contains(e.target));
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
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
      {/* <button className="modalRef" ref={modalRef} onClick={handleClick}> */}
      <button className="modalRef" onClick={handleClick}>
        {props.user.login_name}
      </button>
      {isOpen && (
        <ul
          style={{ left: position + "px" }}
          className="absolute bg-white py-1 px-3 text-black drop-shadow-md"
        >
          <li>View</li>
          <li>MP</li>
          <li>Play</li>
          <li>Remove</li>
          <li>Block</li>
        </ul>
      )}
    </div>
  );
}
