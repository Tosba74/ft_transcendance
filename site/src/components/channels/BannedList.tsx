import { MdNotInterested } from "react-icons/md";
import { ChannelDto } from "src/_shared_dto/channel.dto";
import { MdKey } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { MdPublic } from "react-icons/md";

interface BannedListProps {
  channels: ChannelDto[];
}
export default function BannedList({ channels }: BannedListProps) {
  return (
    <div className="border-blueGray-200 border-b py-5">
      <div className="flex flex-row flex-wrap">
        <div className="w-full">
          <h3 className="flex items-center justify-center text-blueGray-700 mb-5 text-center text-2xl font-semibold leading-normal">
            <MdNotInterested className="inline-block" />
            Banned Channel
          </h3>
          <ul className="h-44 overflow-y-scroll">
            {channels.map((channel) => {
              return (
                <div
                  key={channel.id}
                  className="text-blueGray-700 mb-2 flex text-lg"
                >
                  <div className="flex basis-5/6">
                    <li className="w-14 basis-5/6 truncate">{channel.name}</li>
                    {channel.password && (
                      <MdKey
                        className="basis-1/6 self-center "
                        title="Password Required"
                      />
                    )}
                    {!channel.password && channel.type == 1 && (
                      <MdOutlineEmail
                        className="basis-1/6 self-center"
                        title="Chat"
                      />
                    )}
                    {!channel.password && channel.type == 2 && (
                      <MdPublic
                        className="basis-1/6 self-center"
                        title="Public"
                      />
                    )}
                    {!channel.password && channel.type == 3 && (
                      <FiLock
                        className="basis-1/6 self-center"
                        title="Private"
                      />
                    )}
                  </div>
                  <div className="basis-1/4 self-center rounded bg-blue-500 font-bold text-white hover:bg-blue-700"></div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
