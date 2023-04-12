import axios from "axios";
import { Link } from "react-router-dom";

import { UserDto } from "src/_shared_dto/user.dto";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import { ChannelDto } from "src/_shared_dto/channel.dto";
import classNames from "classnames";
import Colorer from "src/assets/Colorer";

interface PlayerCardProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
  user: UserDto;
}

export default function PlayerCard({ loginer, chats, user }: PlayerCardProps) {
  const handleMessage = () => {
    axios
      .get(`/api/me/chats/conversation/${user.id}`, loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          const chat = res.data as ChannelDto;

          chats.connectRoom(chat.id);

          return;
        }
      })
      .catch((error) => {});
  };

  const addFriend = (user_id: number) => {
    if (
      loginer.userInfos?.friends.indexOf(user_id) === -1 &&
      loginer.userInfos?.asked.indexOf(user_id) === -1
    ) {
      axios
        .post(`/api/me/friends/${user_id}`, {}, loginer.get_headers())
        .then((res) => {
          if (res.status === 201) {
            loginer.getUserData();
            return;
          }
        })
        .catch((error) => {});
    }
  };

  return (
    // <div className="w-full h-screen">

    <Link to={`/players/${user.id}`} className="flex justify-between">
      <div className="mt-4 h-1/4 w-64 rounded-lg border border-gray-200 bg-white py-10 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-80 flex-col items-center pb-10">
          <div
            className={classNames(
              "object-contains rounded-full p-2",
              Colorer(user.login_name)
            )}
          >
            <img
              className="h-36 w-36 rounded-full object-cover shadow-lg"
              src={user.avatar_url}
              alt={user.login_name}
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.pseudo}
          </h5>

          {loginer.userInfos?.id !== user.id && (
            <div className="mt-4 flex space-x-3 md:mt-6">
              <button
                type="button"
                onClick={(e: any) => {
                  e.preventDefault();
                  addFriend(user.id);
                }}
                className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {(loginer.userInfos &&
                  loginer.userInfos?.friends.indexOf(user.id) === -1 &&
                  loginer.userInfos?.asked.indexOf(user.id) === -1 && (
                    <>Add friend</>
                  )) ||
                  (loginer.userInfos &&
                    loginer.userInfos?.asked.indexOf(user.id) !== -1 && (
                      <>Asked</>
                    )) ||
                  (loginer.userInfos &&
                    loginer.userInfos?.friends.indexOf(user.id) !== -1 && (
                      <>Friended</>
                    ))}
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={(e: any) => {
                  e.preventDefault();
                  handleMessage();
                }}
              >
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>

    // </div>
  );
}
