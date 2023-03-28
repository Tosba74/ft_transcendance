import ModalLink from "./ModalLink";

interface users {
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
}

interface ModalProps {
  user: users;
  modalRef: React.MutableRefObject<HTMLUListElement | null>;
  position: number;
}

function handleView(user: users) {
  console.log("view profile " + user.login_name);
}

function handleMP(user: users) {
  console.log("should mp " + user.login_name);
}

function handlePlay(user: users) {
  console.log("should invite to play " + user.login_name);
}

function handleUpdate(user: users) {
  console.log("should add or rm " + user.login_name);
}

function handleBlock(user: users) {
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
