import { useState } from "react";
export default function ChatChannels() {
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!isOpen);
	};
	return (
		<div className="bg-gray-300 rounded-lg p-2 right-0 w-full lg:w-100 h-96">
			<button className="w-full items-center bg-gray-200 p-2 text-center rounded" type="button" onClick={handleClick}>
				{isOpen && <div className="px-4">Channel List</div>}
				{!isOpen && <div className="px-4">Chat Mode</div>}
			</button>
			<div className="bg-gray-200 mt-2 h-80 rounded">
				{isOpen && <div>hohoho!</div>
				}
				{!isOpen && <div>hahaha!</div>
				}
				</div>
		</div>
	);
}