import React, { SyntheticEvent } from 'react';
import axios from 'axios';

import { LoggedUser } from './LoggedUser';
interface PseudoProps {
    user: LoggedUser,
	refreshUserInfos: Function
}

export default function Pseudo({user, refreshUserInfos}: PseudoProps) {

	const { pseudo, } = user;

	const [pseudoInput, setPseudoInput] = React.useState(pseudo);
	const [pseudoInputMessage, setPseudoInputMessage] = React.useState('');
  
	function pseudoValidation(): boolean {
		
		// ajouter validation sur format minimum de pseudo

		if (pseudoInput === '') {
			setPseudoInputMessage('You must specify a pseudo');
			return false;
		}

		return true;
	}

	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();
		
		if (pseudoValidation() === false)
			return;
			
		const token = localStorage.getItem('token');
		if (token) {
			axios.patch(`/api/users/update_pseudo`, {
				pseudo: pseudoInput
			}, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then(res => {
				if (res.data === true) {
					setPseudoInputMessage('New pseudo saved');
					refreshUserInfos();
					setTimeout(() => { setPseudoInputMessage('') }, 3000);
				}
			})
			.catch(() => setPseudoInputMessage('Error: impossible to contact API. Try to re-login...'));
		}
	}

	return (
		<div className="flex justify-center mt-6">
			<form onSubmit={handleSubmit} className="bg-gray-200 w-98 py-2 pt-10 border border-gray-500 shadow-lg center justify-center">
				<div className="content sm:w-98 lg:w-98 w-full center content-center text-center items-center justify-center mh-8">
					
					<div className="mb-6 flex text-center content-center justify-center center w-80 px-6">
						<label className="text-right pr-4 block w-2/5 text-sl font-medium text-gray-900 dark:text-gray-800">
							Your pseudo
						</label>
						<input
							id="pseudo"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
							type="text"
							name="pseudo"
							value={pseudoInput}
							onChange={(event) => setPseudoInput(event.target.value)}
						/>
					</div>

					<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Save
					</button>

					<div className="mt-3 h-6 text-sm text-center">{pseudoInputMessage}</div>

				</div>
			</form>
		</div>
	);
}
