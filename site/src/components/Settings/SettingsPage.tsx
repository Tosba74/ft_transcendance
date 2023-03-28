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
    <div>
      <h2>My settings</h2>

      {/* <div className="flex h-screen w-full justify-center"> */}
      <div className="mt-4 flex h-full w-full flex-col rounded-lg p-4 pt-5 dark:border-gray-700 dark:bg-gray-800 md:h-full md:flex-wrap lg:w-4/6">
        <div className="flex h-4/6 w-full flex-col items-center md:w-1/3">
          <div className="mt-4 h-32 w-32 rounded-full bg-gray-300 md:mt-8 md:h-48 md:w-48"></div>
          <button className="mt-6 inline-flex h-16 w-3/4 items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mt-12">
            Change Picture
          </button>
        </div>
        <div className="h-2/6 w-full md:w-1/3"></div>
        <div className="h-2/6 w-full rounded-lg border shadow-inner dark:border-gray-700 dark:bg-gray-900 md:w-1/3"></div>
      </div>
      {/* </div> */}

      {/* <ProfileList onSave={saveProfile} profiles={profiles} />             */}

      <br />
      <Pseudo loginer={loginer} />
      <br />
      <Avatar loginer={loginer} />
      <br />
      <TfaButton loginer={loginer} />

      {/* add informations like stats, friend, channels, etc in the next 2 components */}
      {/* <ProfilePublic user={user} /> */}
      {/* <ProfilePrivate user={user} /> */}
    </div>
  );
}
