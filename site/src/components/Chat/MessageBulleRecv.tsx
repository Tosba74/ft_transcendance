import { UserDto } from "src/_shared_dto/user.dto";

interface MessageBulleRecvProps {
  user: UserDto;
  text: string;
}

export default function MessageBulleRecv({
  user,
  text,
}: MessageBulleRecvProps) {
  return (
    <div className="my-1 flex w-full flex-row-reverse items-end justify-end pl-2">
      <div className="mx-2 break-all rounded-lg bg-gray-300 p-2 px-4 text-xs text-gray-600">
        {text}
      </div>
      <img
        src={user.avatar_url}
        alt={user.pseudo}
        title={user.pseudo}
        className="h-6 w-6 rounded-full object-cover"
      />
    </div>
  );
}
