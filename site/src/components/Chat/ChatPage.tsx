import { useState } from "react";
import ChatBulleRecv from "./ChatBulleRecv";
import ChatBulleSend from "./ChatBulleSend";
import { Channel } from "./Channel";
import UserList from "./UserList";

export default function ChatPage() {
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!isOpen);
	};
	const handleClose = () => {
		setOpen(!isOpen);
	};
	return (
		<div className="h-full lg:w-1/2 flex flex-col bg-gray-300 dark:bg-gray-800 rounded-lg p-2 shadow-lg">
			<div>
				<div className="w-full flex flex-row justify-between w-full items-center shadow-lg dark:bg-gray-700 dark:text-white bg-gray-200 p-2 text-center rounded">
					<button className="w-full text-center" type="button" onClick={handleClick}>
						{isOpen && <div className="px-4">Channel List</div>}
						{!isOpen && <div className="px-4">Chat Mode</div>}
					</button>
					<button className="w-10" type="button" onClick={handleClose}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
			<div className="h-full bg-gray-200 dark:bg-gray-700 dark:text-white mt-2 shadow-lg rounded overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
				{!isOpen && <div>
					<ChatBulleRecv />
					<ChatBulleRecv />
					<ChatBulleSend />
					<ChatBulleRecv />
					<ChatBulleSend />
					<ChatBulleSend />
				</div>
				}
				{isOpen && <div>
					<UserList />
				</div>
				}
			</div>
		</div>
	);
}