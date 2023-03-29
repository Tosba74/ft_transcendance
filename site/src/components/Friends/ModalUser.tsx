import ModalLink from "./ModalLink";
import { UserDto } from "src/_shared_dto/user.dto";

interface ModalProps {
  user: UserDto;
  modalRef: React.MutableRefObject<HTMLUListElement | null>;
  position: number;
}

function handleView(user: UserDto) {
  console.log("view profile " + user.login_name);
}

function handleMP(user: UserDto) {
  console.log("should mp " + user.login_name);
}

function handlePlay(user: UserDto) {
  console.log("should invite to play " + user.login_name);
}

function handleUpdate(user: UserDto) {
  console.log("should add or rm " + user.login_name);
}

function handleBlock(user: UserDto) {
  console.log("should block " + user.login_name);
}

export default function ModalUser({ user, modalRef, position }: ModalProps) {
  return (
    <ul
      ref={modalRef}
      style={{ left: position + "px" }}
      className="absolute bg-white py-1 px-3 text-black drop-shadow-md"
    >
      <ModalLink onClick={() => handleView(user)}>View</ModalLink>
      <ModalLink onClick={() => handleMP(user)}>MP</ModalLink>
      <ModalLink onClick={() => handlePlay(user)}>Play</ModalLink>
      <ModalLink onClick={() => handleUpdate(user)}>Add</ModalLink>
      <ModalLink onClick={() => handleUpdate(user)}>Remove</ModalLink>
      <ModalLink onClick={() => handleBlock(user)}>Block</ModalLink>
    </ul>
  );
}
