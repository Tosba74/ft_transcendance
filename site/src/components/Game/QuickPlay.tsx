import React, { useEffect } from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const startEL = document.getElementById("root");

export default function QuickPlay({ loginer }: { loginer: UseLoginDto }) {
  const [portal, setPortal] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleClickStart = () => {
    console.log("create game");
    // navigate("/game");
  };

  const handleClickPortal = () => {
    console.log("hello portal");
    setPortal(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref) {
        if (portal && !ref.current?.contains(e.target)) {
          setPortal(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [portal]);

  return (
    <>
      <button
        onClick={handleClickPortal}
        className="mx-auto my-2 rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Quick play
      </button>
      {portal &&
        startEL !== null &&
        createPortal(
          <div
            ref={ref}
            className="absolute top-1/4 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-red-600  p-8 shadow-lg"
          >
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Fun mode
              </span>
            </label>
            <label htmlFor="">
              <input type="text" />
            </label>
            <button
              onClick={handleClickStart}
              className="my-2 mx-auto rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start
            </button>
          </div>,
          startEL
        )}
    </>
  );
}
