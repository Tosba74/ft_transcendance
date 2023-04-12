import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface MessageBulleRecvProps {
  loginer: UseLoginDto;
  user: UserDto;
  text: string;
}

export default function MessageBulleRecv({
  loginer,
  user,
  text,
}: MessageBulleRecvProps) {
  return (
    <div className="my-1 flex w-full flex-row-reverse items-end justify-end pl-2">
      <div className="mx-2 break-all rounded-lg bg-gray-300 p-2 px-4 text-xs text-gray-600">
        {(loginer.userInfos &&
          loginer.userInfos?.blockeds.indexOf(user.id) !== -1 && (
            <>&lt;Message blocked&gt;</>
          )) || <>{text}</>}
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
