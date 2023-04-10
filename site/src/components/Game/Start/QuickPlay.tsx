import React, { useEffect } from "react";
import { UseLoginDto } from "../../Log/dto/useLogin.dto";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { UseGameDto } from "../dto/useGame.dto";
import classNames from "classnames";

const startEL = document.getElementById("root");

interface modeGame {
  isFun: boolean;
  points: number;
  force: boolean;
}

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
  const [mode, setMode] = React.useState<modeGame>({
    isFun: false,
    points: 10,
    force: true,
  });
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

    gamer.createGame(mode.isFun, true, mode.points, mode.force, -1, () => {
      setIsSearch(true);
    });
  };

  const handleClickPortal = () => {
    setEffect(true);
    setPortal(true);
  };

  const handleFun = (e: any) => {
    mode.isFun = e.target.checked;
    setMode(mode);
  };

  const handleForce = (e: any) => {
    mode.force = e.target.checked;
    setMode(mode);
  };

  const handlePoints = (e: any) => {
    mode.points = e.target.valueAsNumber;
    if (!e.target.valueAsNumber) mode.points = 10;
    setMode(mode);
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
              "absolute left-1/2 grid w-3/4 max-w-md -translate-x-1/2 grid-cols-2 items-center gap-2 rounded-lg bg-gray-100 p-4 pb-4 shadow-lg dark:bg-gray-700 dark:text-white sm:w-auto",
              effect ? "opacity-1 animate-fadeIn" : "animate-fadeOut opacity-0"
            )}
            onAnimationEnd={() => {
              if (!effect) setPortal(false);
              if (isSearch && !effect) navigate("/game");
            }}
          >
            <h3 className="col-span-2 text-center text-xl">Option</h3>

            <label className="relative mx-auto cursor-pointer">
              <input
                onChange={handleFun}
                type="checkbox"
                className="peer sr-only place-self-center"
              />
              <div className="peer h-6 w-11 place-self-center rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
            </label>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Fun mode
            </span>

            <label className="relative mx-auto cursor-pointer">
              <input
                onChange={handleForce}
                type="checkbox"
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
            </label>

            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Force
            </span>

            <input
              min="1"
              max="99"
              className="w-[55px] rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="number"
              onChange={handlePoints}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Score
            </label>

            <button
              onClick={handleClickSearch}
              className="col-span-2 mx-auto mt-3 rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search Game
            </button>
          </div>,
          startEL
        )}
    </>
  );
}
