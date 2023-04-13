import React, { SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import axios from "axios";

import { UseLoginDto } from "../Log/dto/useLogin.dto";
import { ParticipantDto } from "src/_shared_dto/participant.dto";
import { UseChatDto } from "./dto/useChat.dto";
import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";

import OwnerInvite from "./OwnerInvite";
import OwnerPw from "./OwnerPw";

const startEL = document.getElementById("root");

interface OwnerCommandsProps {
	loginer: UseLoginDto;
	sendMessage: Function;
	participants: ParticipantDto[];
	role: string;
	room: ChatRoomDto | undefined;
}

export default function OwnerCommands({
	loginer,
	sendMessage,
	participants,
	role,
	room,
}: OwnerCommandsProps) {
	const [portal, setPortal] = React.useState(false);
	const [effect, setEffect] = React.useState(false);

	const ref = React.useRef<HTMLDivElement | null>(null);

	const handleClickPortal = (event: SyntheticEvent) => {
		event.preventDefault();
		setEffect(true);
		setPortal(true);
	};

	React.useEffect(() => {
		const checkIfClickedOutside = (e: any) => {
			if (ref) {
				if (portal && !ref.current?.contains(e.target)) {
					setEffect(false);
				}
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [portal]);

	return (
		<>
			<button className="pl-1" onClick={handleClickPortal}>
				- <span className="hover:underline">{role} settings</span>
				<svg
					style={{ color: "white" }}
					xmlns="http://www.w3.org/2000/svg"
					className="ml-1 inline-block h-4 w-4"
					viewBox="0 0 512 512"
				>
					<path
						d="M256,176a80,80,0,1,0,80,80A80.24,80.24,0,0,0,256,176Zm172.72,80a165.53,165.53,0,0,1-1.64,22.34l48.69,38.12a11.59,11.59,0,0,1,2.63,14.78l-46.06,79.52a11.64,11.64,0,0,1-14.14,4.93l-57.25-23a176.56,176.56,0,0,1-38.82,22.67l-8.56,60.78A11.93,11.93,0,0,1,302.06,486H209.94a12,12,0,0,1-11.51-9.53l-8.56-60.78A169.3,169.3,0,0,1,151.05,393L93.8,416a11.64,11.64,0,0,1-14.14-4.92L33.6,331.57a11.59,11.59,0,0,1,2.63-14.78l48.69-38.12A174.58,174.58,0,0,1,83.28,256a165.53,165.53,0,0,1,1.64-22.34L36.23,195.54a11.59,11.59,0,0,1-2.63-14.78l46.06-79.52A11.64,11.64,0,0,1,93.8,96.31l57.25,23a176.56,176.56,0,0,1,38.82-22.67l8.56-60.78A11.93,11.93,0,0,1,209.94,26h92.12a12,12,0,0,1,11.51,9.53l8.56,60.78A169.3,169.3,0,0,1,361,119L418.2,96a11.64,11.64,0,0,1,14.14,4.92l46.06,79.52a11.59,11.59,0,0,1-2.63,14.78l-48.69,38.12A174.58,174.58,0,0,1,428.72,256Z"
						fill="white">
					</path>
				</svg>
			</button>

			{portal &&
				startEL !== null &&
				createPortal(
					<div
						ref={ref}
						className={classNames(
							"absolute left-1/2 top-1/2 z-50 min-w-[250px] -translate-x-1/2 -translate-y-1/2 items-center rounded-lg bg-gray-100 p-6 dark:bg-gray-800 dark:text-white shadow-lg",
							effect ? "opacity-1 animate-fadeIn" : "animate-fadeOut opacity-0"
						)}
						onAnimationEnd={() => {
							if (!effect) setPortal(false);
						}}
					>
						<h3 className="text-center text-xl">Owner settings</h3>

						{(room?.type === 3 && (
							<OwnerInvite
								loginer={loginer}
								sendMessage={sendMessage}
								participants={participants}
							/>
						)) ||
							(room?.type === 2 && (
								<OwnerPw sendMessage={sendMessage} room={room} />
							))}
					</div>,
					startEL
				)}
		</>
	);
}
