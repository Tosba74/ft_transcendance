// import { Profile } from "./Profile/Profile";
import LogoInconnu from '../assets/img/inconnu.jpeg'

export interface UserInfoProps {
	userdata: {};
	setdata: Function;
}

export default function SetProfil({ userdata , setdata }: UserInfoProps) {
	
	return (
		<div className="flex w-full h-screen justify-center">
			<div className="w-full flex h-screen flex-wrap mt-5 p-4 rounded-lg lg:flex-col lg:w-4/6 dark:bg-gray-800 dark:border-gray-700">
				<div className="w-full bg-red-500 md:w-1/3 h-full">
					<div className="">
						cool
					</div>
				</div>
				<div className="w-full bg-green-500 md:w-1/3 h-full">
				</div>
				<div className="w-full lg:w-1/3 h-full border rounded-lg shadow-inner dark:bg-gray-900 dark:border-gray-700">
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