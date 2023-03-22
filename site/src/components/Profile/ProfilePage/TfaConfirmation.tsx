import React, { SyntheticEvent } from "react";
import axios from "axios";

interface TfaConfirmationProps {
	qrCode: string,
	switchTfaOn: Function,
    setTfaMessage: Function,
}

export default function TfaConfirmation(props: TfaConfirmationProps) {

	const {qrCode, setTfaMessage, switchTfaOn} = props;

	const [codeInput, setCodeInput] = React.useState('');

	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();

		const token = localStorage.getItem('token');
		if (token) {
			axios.post("/api/tfa/confirm-activation", { tfa_code: codeInput }, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then(res => {
				if (res.data === true) {
					switchTfaOn();
					// setQrCode('');
					// setTfaInput('yes')
					// setTfaLabelMessage('enabled')
					// setTfaMessage('Tfa turned on');
					// setTfaButtonMessage('Turn off');
					// refreshUserInfos();
					// setTimeout(() => { setTfaMessage('') }, 3000);
				}
			})
			.catch((error) => {
				console.log(error);
				setTfaMessage('Code invalid')
				setTimeout(() => { setTfaMessage('') }, 3000);
			});
		}

	}

	return (
		<form>
			<label>Scan this qrcode and confirm</label>
			<img src={qrCode} />
			<label>Confirmation:</label>
			<input
				className="px-3 py-1 bg-slate-300"
				type="text"
				placeholder="_ _ _ _ _ _" 
				value={codeInput}
				onChange={e => setCodeInput(e.target.value)}
			/>
			<button onClick={handleSubmit} className="text-white bg-blue-700 px-3 py-1">
				Confirm
			</button>
		</form>
	);

}