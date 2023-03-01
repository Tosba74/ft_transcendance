import React from 'react';

import ChatChannels from './ChatChannels';

export default function ChatPage() {
	return (
		<div>
			<div className="flex left-0 gap-4 p-4 w-full h-full">
				<ChatChannels />
				<ChatChannels />
			</div>
			<h2>**** !!!</h2>
		</div>
	);
	// <ChatChannels />
}