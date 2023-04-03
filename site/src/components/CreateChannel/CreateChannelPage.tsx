import { UseLoginDto } from "../Log/dto/useLogin.dto";
import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CreateChannelPageProps {
	loginer: UseLoginDto;
  }

export default function CreateChannelPage({ loginer }: CreateChannelPageProps) {

	const [pageMessage, setPageMessage] = React.useState("");

	const [typePP, setType] = React.useState(false);
	const [channelName, setChannelName] = React.useState("");
	const [password, setPassword] = React.useState("");

	const navigate = useNavigate();

	const typeHandler = () => {
		setType(typePP => !typePP)
	  }

	const handleSubmit = async (event: SyntheticEvent) => {
	  event.preventDefault();

		if (channelName.length == 0)
			setPageMessage("Name cannot be empty");
		else
		{
			axios
				.post("chats/create", {
					name: channelName,
					password: password,
					type: typePP
				})
				.then((res) => {
					if (res.status == 201) {

						setPageMessage("Channel created, redirecting...");
						setTimeout(() => {
							navigate("/channels");
						}, 3000);
					} //
				})
				.catch(() => setPageMessage("Create Channel error"));
				// }
		}

	};

  return (
    <div className="mx-auto max-w-md">
      <h1 className="pb-4 text-center text-3xl">Create Channel</h1>
	  <form>
		<div className="flex items-start mb-6">
			<div className="flex items-center h-5">
			<input
			id="remember"
			type="checkbox"
			onChange={typeHandler}
			className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
			/>
			</div>
			<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private</label>
		</div>
		<div className="mb-6">
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
			<input
				type="text"
				id="channelName"
				value={channelName}
				onChange={(e) => setChannelName(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Name"
				required
			/>
		</div>
		<div className="mb-6">
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Optional"
				/>
		</div>
		<button
			onClick={handleSubmit}
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Create
		</button>
		<div className="mt-3 h-6 text-center text-sm">{typePP? "true": null}</div>
	</form>
</div>
  );
}
