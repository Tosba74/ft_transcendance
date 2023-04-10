import React, { useEffect } from "react";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { UseGameDto } from "../dto/useGame.dto";
import classNames from "classnames";

const startEL = document.getElementById("root");

export default function QuickPlay({
  loginer,
  gamer,
}: {
  loginer: UseLoginDto;
  gamer: UseGameDto;
}) {
  const [portal, setPortal] = React.useState(false);
  const [effect, setEffect] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [mode, setMode] = React.useState("");
  const ref = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const css = {
    top: `${document.getElementById("startPage")?.offsetTop}px`,
  };

  const handleClickSearch = () => {
    setEffect(false);
    if (mode) {
      console.log("so much fun");
    } else {
      console.log("Boomer");
    }

    gamer.createGame(mode, true, 3, true, -1);
    setIsSearch(true);
  };

  const handleClickPortal = () => {
    setEffect(true);
    setPortal(true);
  };

  const handleOnChange = (e: any) => {
    setMode(e.target.checked);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref) {
        if (portal && !ref.current?.contains(e.target)) {
          setEffect(false);
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
            style={css}
            ref={ref}
            className={classNames(
              "absolute left-1/2 flex w-3/4 max-w-md -translate-x-1/2 flex-col rounded-lg bg-gray-100 p-4 text-center shadow-lg dark:bg-gray-700 dark:text-white sm:w-auto",
              effect === false
                ? "animate-fadeOut opacity-0"
                : "opacity-1 animate-fadeIn"
            )}
            onAnimationEnd={() => {
              if (!effect) setPortal(false);
              if (isSearch && !effect) navigate("/game");
            }}
          >
            <h3 className="pb-2 text-xl">Option</h3>

            <label className="relative mx-auto inline-flex cursor-pointer items-center pb-2">
              <input
                onChange={handleOnChange}
                type="checkbox"
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Fun mode
              </span>
            </label>

            <button
              onClick={handleClickSearch}
              className="my-2 mx-auto rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search Game
            </button>
          </div>,
          startEL
        )}
    </>
  );
}
