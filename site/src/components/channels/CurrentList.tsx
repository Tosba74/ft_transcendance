import { MdPlace } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdVpnLock } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { ChannelDto } from "src/_shared_dto/channel.dto";

interface CurrentListProps {
  channels: ChannelDto[];
}
export default function CurrentList({ channels }: CurrentListProps) {
  return (
    <div className="border-blueGray-200 mt-5 border-b py-5">
      <div className="flex flex-row flex-wrap">
        <div className="w-full">
          <h3 className="text-blueGray-700 mb-5 text-center text-4xl font-semibold leading-normal">
            <MdPlace className="inline-block" />
            Current Channel
          </h3>
          <ul className="overflow-y-scroll h-24">
            {channels.map((channel) => {
              return (
                <div key={channel.id} className="text-blueGray-700 mb-2 flex text-lg">
                  <div className="flex basis-5/6">
                    <li className="w-14 basis-5/6 truncate">{channel.name}</li>
                    {channel.password && (
                      <MdKey className="basis-1/6 self-center" />
                    )}
					{channel.type == 1 && (
                      <MdOutlineEmail className="basis-1/6 self-center" />
                    )}
					{channel.type == 2 && (
                      <MdPublic className="basis-1/6 self-center" />
                    )}
					{channel.type == 3 && (
                      <MdVpnLock className="basis-1/6 self-center" />
                    )}
                  </div>
                  <button
				  className="w-14 basis-1/4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700"
				  type="button"
				  id="btn_join"
				  onClick={() => {
					console.log(`${channel.id} button open pressed`);
				  }}
				  >
				    open
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
