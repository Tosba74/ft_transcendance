import { UserDto } from "src/_shared_dto/user.dto";
import ModalUser from "../Friends/ModalUser";
import React from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface MessageBulleRecvProps {
  user: UserDto;
  text: string;
  loginer: UseLoginDto;
}

export default function MessageBulleRecv({
  user,
  text,
  loginer,
}: MessageBulleRecvProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [target, setTarget] = React.useState();
  const [posX, setPosX] = React.useState(0);
  const [posY, setPosY] = React.useState(0);
  const modalRef = React.useRef<HTMLImageElement | null>(null);

  const handleClick = (event: any) => {
    setIsOpen(true);
    setPosX(25);
    setPosY(event.target.getBoundingClientRect().top - 60);
    setTarget(event.target);
    // console.log(event.target.getBoundingClientRect().top);
    // console.log(window);
    // console.log(event.target.style.top);
    // console.log(user);
    // console.log(modalRef.current?.style.top);
  };

  React.useEffect(() => {
    const handleScroll = (event: any) => {
      if (isOpen) {
        // setIsOpen(false);
        // target
        if (target === undefined) {
          setIsOpen(false);
        } else {
          setPosY(target.getBoundingClientRect().top - 60);
        }
      }
    };

    if (isOpen)
      document.getElementById("chat")?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .getElementById("chat")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  React.useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (modalRef) {
        if (isOpen && !modalRef.current?.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div className="my-1 flex w-full flex-row-reverse items-end justify-end pl-2">
      <div className="mx-2 break-all rounded-lg bg-gray-300 p-2 px-4 text-xs text-gray-600">
        {text}
      </div>
      {isOpen && (
        <ModalUser
          user={user}
          modalRef={modalRef}
          posX={posX}
          posY={posY}
          type={null}
          loginer={loginer}
          doReload={handleClick}
        />
      )}
      <img
        // ref={modalRef}
        src={user.avatar_url}
        alt={user.pseudo}
        title={user.pseudo}
        className="h-6 w-6 min-w-[24px] rounded-full object-cover"
        onClick={handleClick}
      />
    </div>
  );
}
