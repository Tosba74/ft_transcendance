import React, { SyntheticEvent, useState } from "react";
import axios from "axios";

interface TfaCodeProps {
	userId: number,
	loginUser: any,
	errorMsg: any
}

export default function TfaCode({ userId, loginUser, errorMsg}: TfaCodeProps) {

	const [tfaCode, setTfaCode] = React.useState('');

	const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

		axios.post("/api/tfa/authenticate", {
			'id': userId,
			'tfa_code': tfaCode
		})
		.then(res => {
			if (res.status === 201) {
				localStorage.setItem('token', res.data['access_token']);
				loginUser();
			}
		})
		.catch(() => errorMsg('Code invalid'));
    };

    return (
		<>
		<div className="mb-6 flex text-center content-center justify-center center w-80 px-6">
			<label className="text-right pr-4 block w-2/5 text-sl font-medium text-gray-900 dark:text-gray-800">
				Code
			</label>
			<input 
				id="tfaCode"
				className="w-3/5 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				placeholder="_ _ _ _ _ _" 
				value={tfaCode}
				onChange={e => setTfaCode(e.target.value)}
			/>
		</div>
		<button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 center content-center text-center font-medium rounded-lg text-sm md:w-auto px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			Log in
		</button>
		</>
    );
}