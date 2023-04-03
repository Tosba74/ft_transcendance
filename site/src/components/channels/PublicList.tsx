import { MdPublic } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdVpnLock } from "react-icons/md";
import { ChannelDto } from "src/_shared_dto/channel.dto";

interface PublicListProps {
  channels: ChannelDto[];
}

export default function PublicList({ channels }: PublicListProps) {
  return (
    <div className="border-blueGray-200 border-b py-5">
      <div className="flex flex-row flex-wrap">
        <div className="w-full">
          <h3 className="text-blueGray-700 mb-5 flex items-center justify-center text-center text-2xl font-semibold leading-normal">
            <MdPublic className="inline-block " />
            Public Channels
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
                        className="basis-1/6 self-center"
                        title="Password Required"
                      />
                    )}
                  </div>
                  <button
                    className="basis-1/4 self-center rounded bg-blue-500 	font-bold text-white hover:bg-blue-700"
                    type="button"
                    id="btn_join"
                    onClick={() => {
                      console.log(`${channel.id} button join pressed`);
                    }}
                  >
                    join
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
