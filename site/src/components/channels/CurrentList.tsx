import { MdPlace } from "react-icons/md";

export default function CurrentList() {
	return (
		<div className="mt-5 py-5 text-center">
			<div className="flex flex-wrap justify-center">
				<div className="w-full">
					<h3 className="text-blueGray-700 mb-5 text-4xl font-semibold leading-normal">
						<MdPlace className="inline-block" />
						Current Channels
					</h3>
					<div className="text-blueGray-700 text-lg leading-relaxed">
							Smash group
					</div>
				</div>
			</div>
		</div>
	);
}