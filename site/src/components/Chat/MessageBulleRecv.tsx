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
    <div className="mx-1 ml-1 mb-1">
      <div className="flex items-end">
        <div className="order-2 mx-2 my-1 flex max-w-xs flex-col items-start space-y-2 text-xs">
          <div>
            <span className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
              {text}
            </span>
          </div>
        </div>
        <img
          src={user.avatar_url}
          alt={user.pseudo}
          title={user.pseudo}
          className="order-1 h-6 w-6 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
