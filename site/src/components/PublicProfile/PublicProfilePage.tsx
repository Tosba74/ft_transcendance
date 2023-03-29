import { LoggedUserDto } from "../Log/dto/useLogin.dto";
import { Link } from "react-router-dom";

interface ProfilePublicProps {
	player : LoggedUserDto | undefined;
}

export default function ProfilePublic({player}: ProfilePublicProps) {
return (
	<>
		{player && (
			<main className="profile-page grid h-full place-items-center">
			<section className="relative py-16 bg-blueGray-200">
			  <div className="container mx-auto px-4">
				<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
				  <div className="px-6">
					<div className="flex flex-wrap justify-center">
					  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
						<div className="relative">
							<img
								className="mb-3 h-36 w-36 rounded-full object-cover shadow-lg"
								//className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
								src={player.avatar_url}
								alt={player.login_name}
							/>
						</div>
					  </div>
					  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
						<div className="py-6 px-3 mt-32 sm:mt-0">
							<Link
								to="#"
								className="inline-flex items-center rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
								Add friend
							</Link>
							<Link
								to="#"
								className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
								>
								Message
							</Link>
						</div>
					  </div>
					  <div className="w-full lg:w-4/12 px-4 lg:order-1">
						<div className="flex justify-center py-4 lg:pt-4 pt-8">
						  <div className="mr-4 p-3 text-center">
							<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
						  </div>
						  <div className="mr-4 p-3 text-center">
							<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Game numbers</span>
						  </div>
						  <div className="lg:mr-4 p-3 text-center">
							<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89 / 100</span><span className="text-sm text-blueGray-400">Ladder</span>
						  </div>
						</div>
					  </div>
					</div>
					<div className="text-center mt-12 mb-8">
						<div>
							<span
								className="mr-1 inline-block h-3 w-3 rounded-full bg-green-600"
							></span>
							<h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
								{player.pseudo}
							</h3>
						</div>
						<div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
							<i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400 "></i>
								{player.login_name}
							</div>
					</div>
					<div className="mt-2 py-2 border-t border-blueGray-200"></div>
					<div className="text-center">
						<h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">Win</h3>
						<div className="flex justify-center">
							<div className="w-3/4 bg-gray-200 dark:bg-gray-700 overflow-hidden h-4 mb-4 text-xs flex rounded">
								<div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600 dark:bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none" style={{width: "45%"}}>
									 45%
								</div>
								<div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-stone-600 dark:bg-stone-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none" style={{width: "10%"}}>
									 10%
								</div>
								<div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600 dark:bg-red-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none" style={{width: "45%"}}>
									 45%
								</div>
							</div>
						</div>
					</div>
					<div className="mt-10 py-10 border-t border-blueGray-200 text-center">
					  <div className="flex flex-wrap justify-center">
						<div className="w-full lg:w-9/12 px-4">
						  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
							An artist of considerable range, Jenna the name taken by
							Melbourne-raised, Brooklyn-based Nick Murphy writes,
							performs and records all of his own music, giving it a
							warm, intimate feel with a solid groove structure. An
							artist of considerable range.
						  </p>
						  <a href="#pablo" className="font-normal text-pink-500">Show more</a>
						</div>
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
