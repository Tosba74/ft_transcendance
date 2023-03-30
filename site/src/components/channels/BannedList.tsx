import { MdNotInterested } from "react-icons/md";


export default function BannedList() {
	return (
		<div className="border-blueGray-200 mt-5 border-b py-5 text-center">
			<div className="flex flex-wrap justify-center">
				<div className="w-full">
					<h3 className="text-blueGray-700 mb-5 text-4xl font-semibold leading-normal">
						<MdNotInterested className="inline-block" />
						Banned Channels
					</h3>
					<div>
						<div className="text-blueGray-700 text-lg leading-relaxed">
							Raspberry group
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}