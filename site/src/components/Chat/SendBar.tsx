import SendLogo from "../../assets/svg/arrow-right.svg";
import React, { useState } from "react";

export default function SendBar() {
  const [message, setMessage] = useState("");

  //   const { currentUser } = useContext(AuthContext);
  //   const { data } = useContext(ChatContext);

  const handleSend = (e: any) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
    setMessage("");
  };

  return (
    <div className="h-16 w-screen p-2 lg:w-1/3">
      <button
        type="button"
        onClick={handleSend}
        className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 p-2 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none dark:bg-gray-700"
      >
        <input
          type="text"
          placeholder="Write your message!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={
            "w-full rounded-full bg-gray-200 p-1 px-4  text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
          }
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="ml-1 h-9 w-9 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
