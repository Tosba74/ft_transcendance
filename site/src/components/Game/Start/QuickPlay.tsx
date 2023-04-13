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

  const handleFun = (e: any) => {
    setMode((old) => {
      return { ...old, isFun: e.target.checked };
    });
  };

  const handleForce = (e: any) => {
    setMode((old) => {
      return { ...old, force: e.target.checked };
    });
  };

  const handlePoints = (e: any) => {
    if (!e.target.valueAsNumber) {
      setMode((old) => {
        return { ...old, points: 10 };
      });
    } else {
      setMode((old) => {
        return { ...old, points: e.target.valueAsNumber };
      });
    }
  };

  const handleClickSearch = () => {
    setEffect(false);

    gamer.createGame(mode.isFun, true, mode.points, mode.force, -1, () => {
      setIsSearch(true);
    });
  };

  const handleClickPortal = () => {
    setEffect(true);
    setPortal(true);
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
              "absolute left-1/2 grid w-auto min-w-[250px] max-w-md -translate-x-1/2 grid-cols-2 items-center gap-2 rounded-lg bg-gray-100 p-4 px-16 shadow-lg dark:bg-gray-700 dark:text-white",
              effect ? "opacity-1 animate-fadeIn" : "animate-fadeOut opacity-0"
            )}
            onAnimationEnd={() => {
              if (!effect) setPortal(false);
              if (isSearch && !effect) navigate("/game");
            }}
          >
            <h3 className="col-span-2 text-center text-xl">Option</h3>

            <label className="relative right-2 ml-auto cursor-pointer">
              <input
                onChange={handleFun}
                type="checkbox"
                className="peer sr-only place-self-center"
                defaultChecked={mode.isFun}
              />
              <div className="peer h-6 w-11 place-self-center rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
            </label>
            <span className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              Fun mode
            </span>

            <label className="relative right-2 ml-auto cursor-pointer">
              <input
                onChange={handleForce}
                type="checkbox"
                className="peer sr-only"
                defaultChecked={mode.force}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:peer-focus:ring-blue-800"></div>
            </label>

            <span className="whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              Force points
            </span>

            <input
              min="3"
              max="10"
              defaultValue={mode.points}
              className="right-0 ml-auto mr-2 max-w-[55px] rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="number"
              onChange={handlePoints}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Score
            </label>

            <button
              onClick={handleClickSearch}
              className="col-span-2 mx-auto mt-3 whitespace-nowrap rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search Game
            </button>
          </div>,
          startEL
        )}
    </>
  );
}
