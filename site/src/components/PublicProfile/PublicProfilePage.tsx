import { LoggedUserDto } from "../Log/dto/useLogin.dto";
import { Link } from "react-router-dom";
import AddFriend from "../Friends/AddFriend";

interface ProfilePublicProps {
  player: LoggedUserDto | undefined;
}

export default function ProfilePublic({ player }: ProfilePublicProps) {
  return (
    <>
      {player && (
        <main className="h-full place-items-center">
          <section className="bg-blueGray-200">
            <div className="h-100 mt-5 w-full rounded-lg border border-gray-200 bg-white p-10 shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4">
                  <div className="relative mt-8">
                    <img
                      className=" h-36 w-36 rounded-full object-cover shadow-lg"
                      src={player.avatar_url}
                      alt={player.login_name}
                    />
                    <span
					title="connected"
					className="absolute bottom-0 right-5  h-6 w-6 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
                  </div>
                </div>
                <div className=" text-center">
                  <h3 className="text-blueGray-700 mb-2 mb-2 text-4xl font-semibold leading-normal">
                    {player.pseudo}
                  </h3>
                  <div className="text-blueGray-400 mt-0 mb-2 text-sm font-bold leading-normal">
                    <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg "></i>
                    {player.login_name}
                  </div>
                </div>
				<div className="w-full flex justify-center">
					<div className="mr-4 p-3 text-center">
						<span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
							22
						</span>
						<span className="text-blueGray-400 text-sm">Friends</span>
					</div>
					<div className="mr-4 p-3 text-center">
						<span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
							10
						</span>
						<span className="text-blueGray-400 text-sm">
							Game numbers
						</span>
					</div>
					<div className="p-3 text-center">
						<span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
							89 / 100
						</span>
						<span className="text-blueGray-400 text-sm">Ladder</span>
					</div>
				</div>
                <div className="mt-5 mb-5">
                  <button
                    className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
					id="btn_friend"
					onClick={() => {
						console.log("button add friend pressed");
					  }}
				  >
                    Add friend
                  </button>
                  <button
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
					type="button"
					id="btn_friend"
					onClick={() => {
						console.log("button message pressed");
					  }}
				  >
                    Message
                  </button>
                </div>
              </div>
              <div className="border-blueGray-200 mt-5 border-t py-5 text-center">
                <h3 className="text-blueGray-700 mb-5 text-center text-4xl font-semibold leading-normal">
                  Win / lose
                </h3>
                <div className="flex justify-center">
                  <div className="mb-4 flex h-4 w-3/4 overflow-hidden rounded bg-gray-200 text-xs dark:bg-gray-700">
                    <div
                      className="flex flex-col justify-center whitespace-nowrap bg-green-600 p-0.5 text-center text-center text-xs font-medium leading-none text-white text-blue-100 shadow-none dark:bg-green-500"
                      style={{ width: "45%" }}
                    >
                      45%
                    </div>
                    <div
                      className="flex flex-col justify-center whitespace-nowrap bg-stone-600 p-0.5 text-center text-center text-xs font-medium leading-none text-white text-blue-100 shadow-none dark:bg-stone-500"
                      style={{ width: "10%" }}
                    >
                      10%
                    </div>
                    <div
                      className="flex flex-col justify-center whitespace-nowrap bg-red-600 p-0.5 text-center text-center text-xs font-medium leading-none text-white text-blue-100 shadow-none dark:bg-red-500"
                      style={{ width: "45%" }}
                    >
                      45%
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-blueGray-200 mt-5 border-t py-5 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full">
                    <h3 className="text-blueGray-700 mb-5 text-4xl font-semibold leading-normal">
                      Matchs History
                    </h3>
                    <div className="text-blueGray-700 text-lg leading-relaxed">
                      7 tiago vs {player.pseudo} 10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
