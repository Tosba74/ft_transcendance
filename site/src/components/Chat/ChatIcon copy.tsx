import classNames from 'classnames';
import React, { useState, useContext } from 'react'
import ChatPage from './ChatPage';
// import Icon from '../../assets/svg/balloon-heart.svg'

export default function ChatIcon() {
	const [isOpen, setOpen] = useState(false);
	const [message, setMessage] = useState("");


	const handleClick = () => {
		setOpen(true);
		// (isOpen && 
		// 
		// )
		// setOpen(true);
		// send msg
	};

	const handleChange = (event: any) => {
		setMessage(event.target.value);
		console.log(message);
	}

	const handleSend = () => {

	}

	return (
	// <div className="flex flex-col flex-1 p:2 sm:p-6 md:p-8 lg:p-6 justify-between md:w-96 lg:w-96 h-screen">
	<div className="bottom-5 right-10 items-center items-justify-center p-2 h-full">
		{isOpen && <div className='flex flex-col flex-1 w-full bottom h-full'>
			<ChatPage />
		</div>
		}
		<div className='flex justify-center justify-content-center mt-2 rounded-full shadow-lg'>
			{!isOpen &&
				<button type="button" onClick={handleClick} className="flex h-12 rounded-full items-center transition duration-500 ease-in-out text-white bg-cyan-500 hover:bg-blue-400 focus:outline-none w-12 justify-end">
					<div className="flex">
						<div className="mr-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-balloon-heart" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z" />
							</svg>
						</div>
					</div>
				</button >
			}
			{isOpen &&
				<button type="button" onClick={handleChange} className="flex h-12 rounded-full items-center transition duration-500 ease-in-out text-white bg-cyan-500 hover:bg-blue-400 focus:outline-none w-96 justify-between">
					<input type="text" placeholder="Write your message!" value={message} onChange={handleChange} className={classNames("w-80 pl-6 py-1 ml-3 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-full", isOpen ? "visible" : "invisible")} />
					<div className="flex">
						<div className="mr-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
					</div>
				</button>
			}
		</div >
	</div >
);
}











/*
return (
	<div className='bg-gray-400 rounded-full h-10 w-10 p-4 items-center'>
	</div>
);
}
*/
// hein!

// <i className="bi bi-balloon-heart"></i>
{/* <img src={Icon} height="20px" alt="Chat" /> */ }