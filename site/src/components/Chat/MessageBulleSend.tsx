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
    <div className="mx-3 mb-1">
      <div className="chat-message break-words">
        <div className="flex items-end justify-end">
          <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
            <div>
              <span className="inline-block text-ellipsis rounded-lg bg-cyan-500 px-4 py-2 text-white ">
                {text}
              </span>
            </div>
          </div>
          <img
            src={user.avatar_url}
            alt={user.pseudo}
            title={user.pseudo}
            className="order-2 h-6 w-6 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
