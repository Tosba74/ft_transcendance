import { UserDto } from "src/_shared_dto/user.dto";

interface MessageBulleSendProps {
  user: UserDto;
  text: string;
}

export default function MessageBulleSend({
  user,
  text,
}: MessageBulleSendProps) {
  return (
    <div className="pr-2 my-1 w-full flex items-end justify-end">
          <div className="mx-2 text-xs break-all rounded-lg bg-cyan-500 px-4 p-2 text-white ">
                {text}
          </div>
          <img
            src={user.avatar_url}
            alt={user.pseudo}
            title={user.pseudo}
            className="order-2 h-6 w-6 rounded-full object-cover"
          />
    </div>
  );
}
