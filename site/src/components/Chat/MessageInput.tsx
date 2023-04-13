import React, { useState, SyntheticEvent } from "react";

interface MessageInputProps {
  sendMessage: Function;
}

export default function MessageInput({ sendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  async function handleSend(event: SyntheticEvent) {
    event.preventDefault();

    const messageTrimmed = message.trim();
    if (messageTrimmed !== "") {
      console.log(messageTrimmed);
      sendMessage(messageTrimmed);
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSend}>
      <div className="h-16 w-full py-2">
        <div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
          <input
            type="text"
            placeholder="Write your message!"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              // setMessage(event.currentTarget.value);
            }}
            className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
          />

          <button type="submit" className="mr-1 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-1 h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
