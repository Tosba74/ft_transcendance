import { useState } from "react";
import ChatBulleRecv from "./ChatBulleRecv";

export default function ChatPage() {
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!isOpen);
	};
	return (
		<div className="bg-gray-300 rounded-lg p-2 right-0 w-full lg:w-100 h-96 shadow-lg">
			<button className="w-full items-center bg-gray-200 p-2 text-center rounded" type="button" onClick={handleClick}>
				{isOpen && <div className="px-4">Channel List</div>}
				{!isOpen && <div className="px-4">Chat Mode</div>}
			</button>
			<div className="bg-gray-50 mt-2 h-80 rounded overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
				{!isOpen &&
					<div className="mx-1">
						<ChatBulleRecv/>
						<ChatBulleRecv/>
						<ChatBulleRecv/>
						<ChatBulleRecv/>
						<ChatBulleRecv/>
						<ChatBulleRecv/>
					</div>
				}
				{isOpen &&
					<div>
						<ul>
							<li>Channel#1</li>
							<li>Channel#1</li>
						</ul>
					</div>
				}
				</div>
		</div>
	);
}