import { UseLoginDto } from "../Log/dto/useLogin.dto";
import PublicList from "./PublicList";
import BannedList from "./BannedList";
import CurrentList from "./CurrentList";
import { ChannelDto } from "src/_shared_dto/channel.dto";

interface ChannelsPageProps {
  loginer: UseLoginDto;
}

export default function ChannelsPage({ loginer }: ChannelsPageProps) {
  let channelsPublic: ChannelDto[] = [
    {
      id: 1,
      name: "le groupe de lundivvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvv",
      password: false,
	  type:2,
    },
    {
      id: 2,
      name: "Fred et Sebaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      password: true,
	  type:2,
    },
    {
      id: 3,
      name: "Fake private chat",
      password: false,
	  type:2,
    },
	{
		id: 8,
		name: "le groupe de lundivvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvv",
		password: false,
		type:2,
	  },
	  {
		id: 9,
		name: "Fred et Sebaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		password: true,
		type:2,
	  },
	  {
		id: 10,
		name: "Fake private chat",
		password: false,
		type:2,
	  },
  ];
  let channelsBanned: ChannelDto[] = [
    {
      id: 5,
      name: "Raspberry group",
      password: false,
	  type:2,
    },
  ];
  let channelsCurrent: ChannelDto[] = [
	{
		id: 6,
		name: "jarom",
		password: false,
		type:1,
	  },
    {
      id: 6,
      name: "Smash group",
      password: true,
	  type:2,
	},
	{
	  id: 11,
      name: "Ssbu group",
      password: false,
	  type:3,
    },
  ];
  return (
    <div className="mx-auto max-w-md">
      <div className="flex flex-col px-4">
        <PublicList channels={channelsPublic} />
        <BannedList channels={channelsBanned} />
        <CurrentList channels={channelsCurrent} />
        <button
		className="mt-16 h-16 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
		type="button"
				  id="btn_new"
				  onClick={() => {
					console.log(`button open pressed`);
				  }}
		>
          New channel
        </button>
      </div>
    </div>
  );
}
