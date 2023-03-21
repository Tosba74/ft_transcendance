import React, { SyntheticEvent } from 'react';
import axios from 'axios';

import { LoggedUser } from '../LoggedUser';
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
			axios.patch('/api/users/update_pseudo', {
				pseudo: pseudoInput
			}, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then(res => {
				// return true if pseudo successfully changed
				if (res.data === true) {
					setPseudoInputMessage('New pseudo saved');
					refreshUserInfos();
					setTimeout(() => { setPseudoInputMessage('') }, 3000);
				}
			})
			.catch(() => setPseudoInputMessage('Error while contacting the API. Retry after reloging.'));
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>Pseudo :</label>
			<input
				className="px-3 py-1 bg-slate-300"
				type="text"
				name="pseudo"
				value={pseudoInput}
				onChange={(event) => setPseudoInput(event.target.value)}
			/>
			<button type="submit" className="text-white bg-blue-700 px-3 py-1">
				Save
			</button>
			<div>{pseudoInputMessage}</div>
		</form>
	);

}