import React, { SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import axios from "axios";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ParticipantDto } from "src/_shared_dto/participant.dto";
import { UseChatDto } from "./dto/useChat.dto";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

interface OwnerPwProps {
	loginer: UseLoginDto;
	sendMessage: Function;
	participants: ParticipantDto[];
	role: string;
	room: ChatRoomDto | undefined;
}

export default function OwnerPw({ 
	loginer, 
	sendMessage, 
	participants, 
	role, 
	room,
}: OwnerPwProps) {

	const [password, setPassword] = React.useState("");

	const handleAddPassword = (event: SyntheticEvent) => {
		event.preventDefault();
		// ...
	};
	  const handleUpdatePassword = (event: SyntheticEvent) => {
		event.preventDefault();
		// ...
	};
	  const handleRemovePassword = (event: SyntheticEvent) => {
		event.preventDefault();
		// ...
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
							type="text"
							placeholder="New password"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
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
						Change password
					</label>
					<div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
						<input
							type="text"
							placeholder="Current password"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							className="ml-2 w-full rounded-full bg-gray-200 p-1 px-4 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
						/>

					</div>
					<div className="flex h-full w-full items-center justify-around gap-4 rounded-full bg-cyan-500 shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none">
						<input
							type="text"
							placeholder="New password"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
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
						Change
					</button>
				</form>
			</>}

		</div>
	);
}