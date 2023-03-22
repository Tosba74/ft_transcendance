// import { Profile } from "./Profile/Profile";
import LogoInconnu from '../assets/img/inconnu.jpeg'

export interface UserInfoProps {
	userdata: {};
	setdata: Function;
}

export default function SetProfil({ userdata , setdata }: UserInfoProps) {
	
	return (
		<div className="flex w-full h-screen justify-center">
			<div className="w-full flex h-full md:h-full mt-4 p-4 pt-5 rounded-lg flex-col md:flex-wrap lg:w-4/6 dark:bg-gray-800 dark:border-gray-700">
				<div className="w-full flex items-center flex-col md:w-1/3 h-4/6">
					<div className="w-32 h-32 md:w-48 md:h-48 mt-4 md:mt-8 rounded-full bg-gray-300">
					</div>
					<button className="h-16 w-3/4 inline-flex justify-center items-center mt-6 md:mt-12 px-4 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								Change Picture
					</button>
				</div>
				<div className="w-full md:w-1/3 h-4/6">
				</div>
				<div className="w-full md:w-1/3 h-4/6 border rounded-lg shadow-inner dark:bg-gray-900 dark:border-gray-700">
				</div>
			</div>
		</div >
	);
}

{/* <img className="w-36 h-36 object-cover mb-3 rounded-full shadow-lg" src={profile.imageUrl} alt={profile.login} /> */}
{/* <div className="w-full h-100 mt-5 p-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */ }
// <div className="flex flex-col items-center pb-10 w-96">
{/* </div> */ }
			// <div className="w-1/3 h-96"></div>