import { MdPublic } from "react-icons/md";
import { MdKey } from "react-icons/md";

export default function PublicList() {
	return (
		<div className="border-blueGray-200 mt-5 border-b py-5 text-center">
			<div className="flex flex-wrap justify-center">
				<div className="w-full">
					<h3 className="text-blueGray-700 mb-5 text-4xl font-semibold leading-normal">
						<MdPublic className="inline-block" />
						Public Channels
					</h3>
					<div>
						<div className="text-blueGray-700 text-lg leading-relaxed">
							le groupe de lundi
						</div>
						<div className="text-blueGray-700 text-lg leading-relaxed">
							Fred et Seb
							<MdKey className="inline-block" />
						</div>
						<div className="text-blueGray-700 text-lg leading-relaxed">
							Fake private chat
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}