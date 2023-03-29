import React, { useState, SyntheticEvent } from "react";

interface MessageInputProps {
  sendMessage: Function;
}

export default function MessageInput({ sendMessage }: MessageInputProps) {
  const [message, setMessage] = React.useState("");

  function handleSend() {
    // console.log(message);
    sendMessage(message);
    setMessage("");
  }

  return (
    <button
      type="button"
      className="h-12 items-center justify-between rounded-full bg-cyan-500 align-middle text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
      onClick={handleSend}
    >
      <div className="flex flex-row rounded">
        <input
          type="text"
          placeholder="Write your message!"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            // setMessage(event.currentTarget.value);
          }}
          className="ml-3 flex-grow rounded-full bg-gray-200 py-1 pl-6 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
        />

        <div className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-1 h-9 w-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
