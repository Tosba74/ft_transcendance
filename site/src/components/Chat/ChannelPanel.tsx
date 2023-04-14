import ChannelChannelList from "./ChannelChannelList";
import ChannelUserList from "./ChannelUserList";
import { UseChatDto } from "./dto/useChat.dto";

interface ChannelPanelProps {
  chats: UseChatDto;
}

export default function ChannelPanel({ chats }: ChannelPanelProps) {
  return (
    <>
      <ChannelChannelList
        lstChannel={chats.rooms}
        currChannel={chats.currChannel}
        setChannel={chats.setCurrChannel}
        setModeChannel={chats.setModeChannel}
      />
      <ChannelUserList
        users={
          (chats.rooms &&
            chats.rooms[chats.currChannel] &&
            chats.rooms[chats.currChannel].participants) ||
          []
        }
      />
    </>
  );
}
