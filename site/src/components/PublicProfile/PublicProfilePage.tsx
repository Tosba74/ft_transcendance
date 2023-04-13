import AddFriend from "../Friends/AddFriend";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { UserDto } from "src/_shared_dto/user.dto";
import { UserStatsDto } from "src/_shared_dto/user-stats.dto";
import UserStatus from "../Friends/UserStatus";
import { ChannelDto } from "src/_shared_dto/channel.dto";
import { UseChatDto } from "../Chat/dto/useChat.dto";
import Colorer from "src/assets/Colorer";
import classNames from "classnames";

interface UserListPageProps {
  loginer: UseLoginDto;
  chats: UseChatDto;
}

export default function ProfilePublic({ loginer, chats }: UserListPageProps) {
  const [error, setError] = React.useState<string>();
  const [user, setUser] = React.useState<UserDto>();
  const [stats, setStats] = React.useState<UserStatsDto>();
  const params = useParams();
  const id = Number(params.id);

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

  const manageBlock = (user_id: number, is_blocked: boolean) => {
    if (is_blocked) {
      axios
        .delete(`/api/me/blockeds/${user_id}`, loginer.get_headers())
        .then((res) => {
          if (res.status === 204) {
            loginer.getUserData();
            return;
          }
        })
        .catch((error) => {});
    } //
    else {
      axios
        .post(`/api/me/blockeds/${user_id}`, {}, loginer.get_headers())
        .then((res) => {
          if (res.status === 201) {
            loginer.getUserData();
            return;
          }
        })
        .catch((error) => {});
    }
  };

  const handleMessage = () => {
    axios
      .get(`/api/me/chats/conversation/${id}`, loginer.get_headers())
      .then((res) => {
        if (res.status === 200) {
          const chat = res.data as ChannelDto;

          chats.connectRoom(chat.id);

          return;
        }
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    axios
      .get(`/api/users/${id}`, loginer.get_headers())
      .then((res: any) => {
        if (res.status === 200) {
          setUser(res.data as UserDto);
        } //
        else {
          setError("non valide");
        }
      })
      .catch((e) => {
        setError(e.message);
      });

    axios
      .get(`/api/users/${id}/stats`, loginer.get_headers())
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data);
          setStats(res.data as UserStatsDto);
        } //
        else {
          setError("non valide");
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [id]);

  return (
    <>
      {error && (
        <div className="row">
          <div className="card large error">
            <div
              className="text-red-1000 mb-4 rounded-lg bg-red-500 p-4 text-center dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <h1 className="text-2xl font-medium">ERROR! {error}</h1>
            </div>
          </div>
        </div>
      )}

      {user && (
        <section className="bg-blueGray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
          <div className="h-100 mt-5 w-full rounded-lg border border-gray-200 bg-white p-10 shadow dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-wrap justify-center">
              <div className="flex w-full justify-center px-4">
                <div className="relative mt-8">
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

                  <UserStatus
                    status={user.status}
                    classes={
                      "absolute bottom-0 right-5 h-6 w-6 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"
                    }
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold leading-normal ">
                  {user.pseudo}
                </h3>
              </div>
              <div className="flex w-full justify-center">
                <div className="mr-4 p-3 text-center">
                  <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                    {stats?.friends_count}
                  </span>
                  <span className="text-blueGray-400 text-sm">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                    {stats?.games_count}
                  </span>
                  <span className="text-blueGray-400 text-sm">
                    Game numbers
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                    {stats?.rank}
                  </span>
                  <span className="text-blueGray-400 text-sm">Ladder</span>
                </div>
              </div>

              {loginer.userInfos && user.id != loginer.userInfos.id && (
                <div className="mt-5 mb-5">
                  <button
                    type="button"
                    onClick={(e: any) => {
                      addFriend(user.id);
                    }}
                    className="mx-1 inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    className="mx-1 inline-flex  items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    onClick={(e: any) => {
                      handleMessage();
                    }}
                  >
                    Message
                  </button>

                  <button
                    type="button"
                    onClick={(e: any) => {
                      manageBlock(
                        user.id,
                        loginer.userInfos?.blockeds.indexOf(user.id) !== -1
                      );
                    }}
                    className="mx-1 inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    {(loginer.userInfos &&
                      loginer.userInfos?.blockeds.indexOf(user.id) !== -1 && (
                        <>Unblock</>
                      )) ||
                      (loginer.userInfos &&
                        loginer.userInfos?.blockeds.indexOf(user.id) === -1 && (
                          <>Block</>
                        ))}
                  </button>
                </div>
              )}
            </div>

            <div className="border-blueGray-200 mt-5 border-t py-5 text-center">
              <h3 className="text-blueGray-700 mb-5 text-center text-4xl font-semibold leading-normal">
                Win / lose
              </h3>
              <div className="flex justify-center">
                <div className="mb-4 flex h-4 w-3/4 overflow-hidden rounded bg-gray-200 text-xs dark:bg-gray-700">
                  {stats && stats?.win_rate > 0 && (
                    <div
                      className="flex flex-col justify-center whitespace-nowrap bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-white shadow-none dark:bg-green-500"
                      style={{ width: `${stats?.win_rate}%` }}
                    >
                      {`${stats?.win_rate}%`}
                    </div>
                  )}

                  {stats && stats?.win_rate < 100 && (
                    <div
                      className="flex flex-col justify-center whitespace-nowrap bg-red-600 p-0.5 text-center text-xs font-medium leading-none text-white shadow-none dark:bg-red-500"
                      style={{ width: `${100 - stats?.win_rate}%` }}
                    >
                      {`${100 - stats?.win_rate}%`}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-blueGray-200 mt-5 border-t py-5 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full">
                  <h3 className="text-blueGray-700 mb-5 text-4xl font-semibold leading-normal">
                    Matchs History
                  </h3>
                  <div className="text-blueGray-700 mx-10 grid max-h-[200px] grid-cols-[minmax(0,_1fr)_50px_minmax(0,_1fr)] overflow-y-auto whitespace-nowrap border text-center text-lg leading-relaxed">
                    {(stats &&
                      stats.last_games.length > 0 &&
                      stats.last_games.map((game) => {
                        return (
                          <React.Fragment key={game.id}>
                            <span className="justify-self-end">{`${game.user1.pseudo} ${game.user1_score}`}</span>
                            <span className="justify-self-center">{`vs`}</span>
                            <span className="justify-self-start">{`${game.user2_score} ${game.user2.pseudo}`}</span>
                          </React.Fragment>
                        );
                      })) || (
                      <span className="col-span-3">No games played</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
