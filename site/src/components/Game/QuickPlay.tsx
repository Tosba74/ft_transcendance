import React, { useEffect } from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { createPortal } from "react-dom";

export default function QuickPlay({ loginer }: { loginer: UseLoginDto }) {
  const [modal, setModal] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const startEL = document.getElementById("root");

  const handleClickQuickPlay = () => {
    console.log("hello modal");
    setModal(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref) {
        if (modal && !ref.current?.contains(e.target)) {
          setModal(false);
        }
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [modal]);

  return (
    <>
      <button
        onClick={handleClickQuickPlay}
        className="mx-auto my-2 rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Quick play
      </button>
      {modal &&
        startEL !== null &&
        createPortal(
          <div
            ref={ref}
            className="absolute top-1/4 left-1/2 flex w-full max-w-md -translate-x-1/2  -translate-y-1/2 flex-col bg-red-600"
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
            hello
          </div>,
          startEL
        )}
    </>
  );
}
