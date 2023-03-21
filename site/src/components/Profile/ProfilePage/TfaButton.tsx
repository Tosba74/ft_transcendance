import React, { SyntheticEvent } from "react";
import axios from "axios";

import { LoggedUser } from "../LoggedUser";
interface TfaButtonProps {
    user: LoggedUser,
    refreshUserInfos: Function
}

export default function TfaButton({user, refreshUserInfos}: TfaButtonProps) {

	const {tfa_enabled, } = user;

	const [tfaInput, setTfaInput] = React.useState('');
	const [tfaLabelMessage, setTfaLabelMessage] = React.useState('')
	const [tfaInputMessage, setTfaInputMessage] = React.useState('')
	const [tfaButtonMessage, setTfaButtonMessage] = React.useState('')

	const [qrCode, setQrCode] = React.useState('')

	React.useEffect(() => {
		tfa_enabled === false ? setTfaInput('no') : setTfaInput('yes');
		tfa_enabled === false ? setTfaLabelMessage('disabled') : setTfaLabelMessage('enabled');
		tfa_enabled === false ? setTfaButtonMessage('on') : setTfaButtonMessage('off');
	}, []);

	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();

		const token = localStorage.getItem('token');
		if (token) {
			let route: string = '';
			tfaInput === 'no' ? route = 'turn-on' : route = 'turn-off';

			// besoin de la reponse entiere pour utiliser blob(), pas en json desarialized commme avec axios
			fetch(`/api/tfa/${route}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then(async res => {
				// if route === turn-on api return qr code on success
				// if route === turn-off api return 'disabled' on success

				if (route === 'turn-on') {
					const blob = await res.blob();
					const url = URL.createObjectURL(blob);
					setQrCode(url);

					// setTfaInput('yes')
					// setTfaLabelMessage('enabled')
					// setTfaInputMessage('Tfa turned on');
					// setTfaButtonMessage('off');
					// refreshUserInfos();
					// setTimeout(() => { setTfaInputMessage('') }, 3000);
				}
				else {
					setTfaInput('no')
					setTfaLabelMessage('disabled')
					setTfaInputMessage('Tfa turned off');
					setTfaButtonMessage('on');
					refreshUserInfos();
					setTimeout(() => { setTfaInputMessage('') }, 3000);
				}
			})
			.catch(() => setTfaInputMessage('Error while contacting the API. Retry after reloging.'));
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>Two factor authentication is {tfaLabelMessage}</label>
			<button
				className="text-white bg-blue-700 px-3 py-1"
				type="submit"
				name="tfa_enable"
				value={tfaInput}
			>
			Turn {tfaButtonMessage}
			</button>
		{
			qrCode !== '' &&
			<>
				<div>qrcode:</div>
				<img src={qrCode} />
			</>
		}
			<div>{tfaInputMessage}</div>
		</form>
	);
}