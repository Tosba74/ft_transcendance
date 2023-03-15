import React, { useState } from "react";
import * as pong from '../../pong';
//import "../../pong"

export default function GamePage() {
	const [pause, setPause] = React.useState(false);
	const handleClick = () => {
		setPause(!pause);
	};


	return (
		<div className="bg-yellow-400 w-full h-full">
			{/* <h2>ICI !!! on game !!</h2> */}
			<div className="bg-gray-800 w-full z-50 top-10 px-40">
				<div className="flex flex-row space-x-4 rounded bg-gray-400 border border-gray-300 w-40 text-center items-center basis-1 md:basis-1/2 ld:basis-1/4 bg-gray-300">
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">01</div>
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">02</div>
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">03</div>
					<div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">04</div>
				</div>
			</div>
			<div>
				<canvas className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="canvas" style={{border: '1px solid rgba(255, 255, 255, 0.85)', backgroundColor: 'rgba(0, 0, 0, 0.85)', width: '50%'}}>
				</canvas>
			</div>
			<div>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={pong.startGame}>
					Start
				</button>
				<br></br>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_pause" style={{visibility: 'hidden'}} onClick={pong.do_pause}>
					Pause
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_restart" style={{visibility: 'hidden'}} onClick={pong.restart}>
					restart
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={pong.exportToJson}>
					export to JSON
				</button>


			</div>
		</div>
	);
}