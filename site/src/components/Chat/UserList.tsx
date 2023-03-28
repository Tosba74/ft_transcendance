import { useState } from "react";
import { Link } from "react-router-dom";
import { Channel } from "./Channel";
import { Profile } from "../Profile/Profile";
import { Mock_Profile } from "../Profile/Mock_Profile";

interface UserListProps {
  lstChannel: Channel[];
  setCurrChannel: Function;
  mode: Function;
}

export default function UserList({
  lstChannel,
  setCurrChannel,
  mode,
}: UserListProps) {
  const [clients] = useState<Profile[]>(Mock_Profile);
  const handleChange = (chan: Channel) => {
    setCurrChannel(chan.id);
    mode();
  };
  return (
    <div className="h-screen w-full p-2">
      <div className="h-1/3 bg-gray-800 p-2 shadow-inner-lg rounded-md">
        <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          {lstChannel.map((channel) => (
            <div>
              <button
                type="button"
                onClick={() => {
                  handleChange(channel);
                }}
              >
                <strong>{channel.name}</strong> <small>{channel.title}</small>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        {clients.map((client) => (
          <div className="p-1 flex flex-wrap gap-3">
            <img
              src={client.imageUrl}
              alt="My profile"
              className="object-cover w-6 h-6 rounded-full"
            />
            <h2 className="">
              <Link to="#">
                {client.login} <small>{client.title}</small>
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
