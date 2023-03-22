import { channel } from 'diagnostics_channel';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Channel } from './Channel'
import { Mock_Channel } from './Mock_Channel';
import { Profile } from '../Profile/Profile'
import { Mock_Profile } from '../Profile/Mock_Profile';

export default function UserList() {
	const [channels] = useState<Channel[]>(Mock_Channel);
	const [clients] = useState<Profile[]>(Mock_Profile);
	return (
		<div className="h-screen w-full p-2">
			<div className="h-1/3 bg-gray-800 p-2 shadow-inner-lg rounded-md"> 
				<div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
					{channels.map((channel) => (
						<div>
							<Link to='#'>
								<strong>{channel.name}</strong> <small>{channel.title}</small>
							</Link>
						</div>
					))}
				</div>
			</div>
				<div className='p-4'>
				{clients.map((client) => (
					<div className="p-1 flex flex-wrap gap-3">
						<img src={client.imageUrl} alt="My profile" className="object-cover w-6 h-6 rounded-full" />
						<h2 className="">
							<Link to='#'>
								{client.login} <small>{client.title}</small>
							</Link>
						</h2>
					</div>
					))}
				</div>
		</div>
	);
}

/*
			<ul>
				<li>Channel#1</li>
				<li>Channel#2</li>
			</ul>
		*/
// <div key={channel.id}></div>
{/* listchat */ }