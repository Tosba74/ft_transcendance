import React from "react";
import Avatar from "./Avatar";
import Pseudo from "./Pseudo";
import TfaButton from "./TfaButton";

import { UseLoginDto } from "src/components/Log/dto/useLogin.dto";

interface SettingsPageProps {
  loginer: UseLoginDto;
}

export default function SettingsPage({ loginer }: SettingsPageProps) {
  const [settingsError, setSettingsError] = React.useState("");

  return (
    <div className="h-full w-full p-2 md:flex md:justify-center">
      <div className="flex h-5/6 w-full flex-col gap-2 rounded border border-gray-300 bg-gray-200 p-2 shadow-xl dark:border-gray-700 dark:bg-gray-700 md:w-5/6 lg:w-full lg:flex-row">
        <div className="h-1/2 w-full lg:h-full lg:w-2/3">
          <Avatar loginer={loginer} setSettingsError={setSettingsError} />
          <Pseudo loginer={loginer} setSettingsError={setSettingsError} />
        </div>
        <div className="h-1/2 w-full justify-center rounded border bg-gray-300 p-2 shadow-inner dark:border-gray-700 dark:bg-gray-800 lg:h-full lg:w-1/3">
          <TfaButton loginer={loginer} setSettingsError={setSettingsError} />
        </div>
        <div>{settingsError}</div>
      </div>

      {/* add informations like stats, friend, channels, etc in the next 2 components */}
      {/* <ProfilePublic user={user} /> */}
      {/* <ProfilePrivate user={user} /> */}
    </div>
  );
}

{
  /* <div className="flex h-screen w-full justify-center">
    <div className="h-1/3 w-full justify-end bg-yellow-500 lg:h-full lg:w-1/3">
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
      onSave={saveProfile} profiles={profiles} />
    */
}
