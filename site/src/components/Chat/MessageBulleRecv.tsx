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
    <div className="pl-2 my-1 w-full flex flex-row-reverse items-end justify-end">
          <div className="mx-2 text-xs break-all rounded-lg bg-cyan-500 px-4 p-2 text-white ">
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
