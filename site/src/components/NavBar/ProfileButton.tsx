import LogoInconnu from '../../assets/img/inconnu.jpeg'
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProfileButtonProps {
	logged: boolean,
}

export default function ProfileButton({ logged }: ProfileButtonProps) {
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!isOpen);
	};

	// <div class="flex items-center md:order-2">
      {/* <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"> */}
        {/* <span class="sr-only">Open user menu</span> */}
        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"> */}
      {/* </button> */}


	return (
		<div className="flex items-center md:order-2 shadow-lg">
			<button
				type="button" onClick={handleClick} className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
				<span className="sr-only">Open user menu</span>
				<img className="w-8 h-8 rounded-full" height="8" src={LogoInconnu} alt="user photo" />
			</button>
			{isOpen && <div className="absolute top-20 right-2 z-40 w-40 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
				<div className="px-4 py-3">
					<span className="block text-sm text-gray-900 dark:text-white">Login_42</span>
					<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@gmail.com</span>
				</div>
				<ul className="py-2" aria-labelledby="user-menu-button">
					{logged &&
						<ul>
							<Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
								History
							</Link>
							<Link to="/profile/:id" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
								Settings
							</Link>
						</ul>
					}
					{!logged &&
						<ul>
							<Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
								Log in
							</Link>
							<a href="/api/login/apisignin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
								Log in api
							</a>
						</ul>
					}
					{logged &&
						<Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
							Log out
						</Link>
					}
				</ul>
			</div>
			}
		</div>
	);
}

{/* isOpen && <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown"> */ }
