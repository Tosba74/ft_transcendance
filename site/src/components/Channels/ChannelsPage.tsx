import { UseLoginDto } from "../Log/dto/useLogin.dto";
import PublicList from "./PublicList";
import BannedList from "./BannedList";
import CurrentList from "./CurrentList";

interface ChannelsPageProps {
  loginer: UseLoginDto;
}

export default function ChannelsPage({ loginer }: ChannelsPageProps) {
  //
  return (
    <div className="mx-auto max-w-md">
      <div className="flex flex-col px-4">
        <PublicList loginer={loginer} />
        <BannedList loginer={loginer} />
        <CurrentList loginer={loginer} />
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
