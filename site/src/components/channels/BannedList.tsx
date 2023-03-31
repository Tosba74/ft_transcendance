import { MdNotInterested } from "react-icons/md";
import { ChannelDto } from "src/_shared_dto/channel.dto";

interface BannedListProps {
  channels: ChannelDto[];
}
export default function BannedList({ channels }: BannedListProps) {
  return (
    <div className="border-blueGray-200 mt-5 border-b py-5">
      <div className="flex flex-row flex-wrap">
        <div className="w-full">
          <h3 className="text-blueGray-700 mb-5 text-center text-4xl font-semibold leading-normal">
            <MdNotInterested className="inline-block" />
            Banned Channel
          </h3>
          <ul>
            {channels.map((channel) => {
              return (
                <div key={channel.id} className="text-blueGray-700 mb-2 flex text-lg">
                  <div className="flex basis-5/6">
                    <li className="w-14 basis-5/6 truncate">{channel.name}</li>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
