import logoInconnu from "../assets/img/inconnu.jpeg"
import { Link } from 'react-router-dom'
import { Profile } from "./Profile";

interface ProfilProps {
	profile: Profile;
  }

export default function Profil(props: ProfilProps) {
	const { profile } = props;

	return (
		// <div className="w-full h-screen">

			<div className="flex justify-between">

				<div className="w-full h-100 mt-5 p-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div className="flex flex-col items-center pb-10 h-80">
						<img className="w-36 h-36 object-cover mb-3 rounded-full shadow-lg" src={profile.imageUrl} alt={profile.login} />
						<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><strong>{profile.name}</strong> {profile.firstname}</h5>
						<h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.login}</h3>
						<span className="block min-h-min text-sm mt-3 text-gray-500 dark:text-gray-400">{profile.title}</span>
						<div className="flex mt-4 space-x-3 md:mt-6">
							<Link to="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								Add friend
							</Link>
							<Link to="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
								Message
							</Link>
						</div>
					</div>
				</div>

			</div>

		// </div>
	);
}