import Avatar from "./Avatar";
import Pseudo from "./Pseudo";
import TfaButton from "./TfaButton";

import { UseLoginDto } from "src/components/Log/dto/useLogin.dto";

interface SettingsPageProps {
  loginer: UseLoginDto;
}

export default function SettingsPage({ loginer }: SettingsPageProps) {
  //
  return (
    <div className="h-full w-full p-2 md:flex md:justify-center">
      <div className="flex h-4/6 w-full flex-col gap-2 rounded border border-gray-300 bg-gray-200 p-2 shadow-xl dark:border-gray-700 dark:bg-gray-700 md:w-5/6 lg:w-full lg:flex-row">
        <div className="h-1/2 w-full lg:h-full lg:w-2/3">
          <Avatar loginer={loginer} />
          <Pseudo loginer={loginer} />
        </div>
        <div className="h-1/2 w-full justify-center rounded border bg-gray-300 p-2 shadow-inner dark:border-gray-700 dark:bg-gray-800 lg:h-full lg:w-1/3">
          <TfaButton loginer={loginer} />
        </div>
      </div>
    </div>
  );
}
