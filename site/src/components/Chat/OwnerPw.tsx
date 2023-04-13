import React, { SyntheticEvent } from "react";
import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

interface OwnerPwProps {
	loginer: UseLoginDto;
	sendMessage: Function;
	room: ChatRoomDto | undefined;
	portal: Function;
}

export default function OwnerPw({
	loginer,
	sendMessage,
	room,
	portal
}: OwnerPwProps) {

	const [addPassword, setAddPassword] = React.useState("");
	const handleAddPassword = (event: SyntheticEvent) => {
		event.preventDefault();
		if (addPassword.length > 0) {
			sendMessage(`/pw ${addPassword}`);
			setAddPassword("");

			// update room everywhere needed
			// ...
			console.log('need to update protected info');
			if (room?.protected)
				room.protected = true;

			// refresh portal
			// portal();
		}
	};


	const [currentPassword, setCurrentPassword] = React.useState("");
	const [errorMsg, setErrorMsg] = React.useState("");

	const [newPassword, setNewPassword] = React.useState("");
	const handleUpdatePassword = (event: SyntheticEvent) => {
		event.preventDefault();
		if (currentPassword.length === 0) {
			setErrorMsg('Please give current password')
		}
		else if (currentPassword.length > 0 && newPassword.length > 0) {
			sendMessage(`/pw ${currentPassword} ${newPassword}`);
			setCurrentPassword("");
			setNewPassword("");
			setErrorMsg("");

			// update room everywhere needed
			// ...
			console.log('need to update protected info');
			if (room?.protected)
				room.protected = true;

			// refresh portal
			// portal();
		}
	};

	const handleRemovePassword = (event: SyntheticEvent) => {
		event.preventDefault();
		if (currentPassword.length === 0) {
			setErrorMsg('Please give current password')
		}
		else if (currentPassword.length > 0) {
			sendMessage(`/pw ${currentPassword}`);
			setCurrentPassword("");
			setErrorMsg("");

			// update room everywhere needed
			// ...
			console.log('need to update protected info');
			if (room?.protected)
				room.protected = true;

			// refresh portal
			// portal();
		}
	};

	console.log(room);
	return (
		<div className="mb-6 w-full py-2">

			{room?.protected === false &&
				(<form onSubmit={handleAddPassword}>
					<label className="">
						Add a password
					</label>
					<div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
						<input
							type="password"
							placeholder="New password"
							value={addPassword}
							onChange={(event) => {
								setAddPassword(event.target.value);
							}}
							className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
						/>

					</div>
					<button type="submit" className="w-14 basis-1/4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700">
						Change
					</button>
				</form>)

				|| <>
					<form onSubmit={handleUpdatePassword}>
						<label className="">
							Confirm current password
						</label>
						<div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
							<input
								type="password"
								placeholder="Current password"
								value={currentPassword}
								onChange={(event) => {
									setCurrentPassword(event.target.value);
								}}
								className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
							/>

						</div>

						<label className="">
							Set a new password
						</label>
						<div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
							<input
								type="password"
								placeholder="New password"
								value={newPassword}
								onChange={(event) => {
									setNewPassword(event.target.value);
								}}
								className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
							/>

						</div>
						<button type="submit" className="w-14 basis-1/4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700">
							Change
						</button>
					</form>

					<form onSubmit={handleRemovePassword}>
						<label className="">
							Remove password
						</label>
						<button type="submit" className="w-14 block basis-1/4 rounded bg-blue-500 font-bold text-white hover:bg-blue-700">
							Remove password
						</button>
					</form>

					<div className="text-orange-400">{errorMsg}</div>
				</>}

		</div>
	);
}