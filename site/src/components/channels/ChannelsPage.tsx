import { UseLoginDto } from "../Log/dto/useLogin.dto";
import PublicList from "./PublicList";
import BannedList from "./BannedList";
import CurrentList from "./CurrentList";

interface ChannelsPageProps {
	   loginer: UseLoginDto;
  }

  export default function ChannelsPage({ loginer }: ChannelsPageProps) {
	return (
		<div className="mx-auto max-w-md">
		<h1 className="pb-4 text-center text-3xl">Friends List</h1>
		<div className="flex flex-col px-4">
		  <PublicList />
		  <BannedList />
		  <CurrentList />
		</div>
	  </div>
	);
  }