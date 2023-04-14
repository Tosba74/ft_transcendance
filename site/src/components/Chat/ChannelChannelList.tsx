
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

interface ChannelChannelListProps {
  currChannel: number;
  lstChannel: { [key: string]: ChatRoomDto } | undefined;
  setChannel: Function;
  setModeChannel: Function;
}

export default function ChannelChannelList({
  currChannel,
  lstChannel,
  setChannel,
  setModeChannel,
}: ChannelChannelListProps) {
  //

  const handleShow = (chan: ChatRoomDto) => {
    setChannel(chan.id);
  };
  const handleChange = (chan: ChatRoomDto) => {
    setChannel(chan.id);
    setModeChannel();
  };

  // const [channels] = useState<Channel[]>(Mock_Channel);
  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 scrolling-touch mt-2 h-1/3 w-full overflow-y-scroll rounded rounded-b bg-gray-400 py-1 px-4 shadow-inner dark:bg-gray-600 dark:text-white">
      {lstChannel &&
        Object.keys(lstChannel).map((key) => {
          return (
            <div
              className="mt-1 flex w-full flex-row items-center justify-center gap-2"
              key={lstChannel[key].id}
            >
              <button
                className="flex w-5/6 justify-start truncate dark:text-white"
                title={lstChannel[key].name}
                type="button"
                onClick={() => {
                  handleShow(lstChannel[key]);
                }}
              >
                <strong>{lstChannel[key].name}</strong>
              </button>

              <button
                type="button"
                onClick={() => handleChange(lstChannel[key])}
                className="justify-center rounded bg-cyan-500 p-1 px-2 text-white"
              >
                Open
              </button>
            </div>
          );
        })}
    </div>
  );
}
