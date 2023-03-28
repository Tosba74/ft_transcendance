import React, { SyntheticEvent } from "react";
import TfaConfirmation from "./TfaConfirmation";

import { LoggedUser } from "../LoggedUser";
interface TfaButtonProps {
    user: LoggedUser,
    refreshUserInfos: Function
}

export default function TfaButton({user, refreshUserInfos}: TfaButtonProps) {

	const {tfa_enabled, } = user;

	const [tfaInput, setTfaInput] = React.useState('');

	const [tfaLabelMessage, setTfaLabelMessage] = React.useState('')
	const [tfaMessage, setTfaMessage] = React.useState('')
	const [tfaButtonMessage, setTfaButtonMessage] = React.useState('')

	const [buttonDisabled, setButtonDisabled] = React.useState(false);

	const [qrCode, setQrCode] = React.useState('')

	// charge les messages correct au premier rendu de la page
	React.useEffect(() => {
		tfa_enabled === false ? setTfaInput('no') : setTfaInput('yes');
		tfa_enabled === false ? setTfaLabelMessage('disabled') : setTfaLabelMessage('enabled');
		tfa_enabled === false ? setTfaButtonMessage('Turn on') : setTfaButtonMessage('Turn off');
	}, []);

	function switchTfaOn() {
		setQrCode('');
		setTfaInput('yes')
		setTfaLabelMessage('enabled')
		setTfaMessage('Tfa turned on');
		setTfaButtonMessage('Turn off');
		refreshUserInfos();
		setTimeout(() => { setTfaMessage('') }, 3000);
	}

	function switchTfaOff() {
		setTfaInput('no')
		setTfaLabelMessage('disabled')
		setTfaMessage('Tfa turned off');
		setTfaButtonMessage('Turn on');
		refreshUserInfos();
		setTimeout(() => { setTfaMessage('') }, 3000);
	}

	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();

		const token = localStorage.getItem('token');
		if (token) {
			let route: string = '';
			tfaInput === 'no' ? route = 'turn-on' : route = 'turn-off';

			// fetch car besoin de la reponse entiere pour utiliser blob() (axios desarialize tout  en json)
			fetch(`/api/tfa/${route}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then(async res => {
				// with turn-on api return qr code on success / with turn-off api return 'disabled' on success
				if (route === 'turn-on') {
					const blob = await res.blob();
					const url = URL.createObjectURL(blob);
					setQrCode(url);
					
					setButtonDisabled(true); 				/* mettre le bouton turn-on en disabled */
					// setTfaButtonMessage('Refresh QR');		/* ou mettre le texte du bouton en refresh */
				}
				else
					switchTfaOff()
			})
			.catch(() => setTfaMessage('Error while contacting the API. Retry after reloging.'));
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Two factor authentication is {tfaLabelMessage}</label>
				<button
					id="tfa_enable"
					className="text-white bg-blue-700 px-3 py-1"
					type="submit"
					name="tfa_enable"
					value={tfaInput}
					disabled={buttonDisabled}
				>
				{tfaButtonMessage}
				</button>
			</form>
			{ qrCode !== '' &&
				<TfaConfirmation qrCode={qrCode} switchTfaOn={switchTfaOn} setTfaMessage={setTfaMessage} />
			}
			<div>{tfaMessage}</div>
		</>
	);

}