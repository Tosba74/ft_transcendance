import React, { useState, useEffect } from "react";
import * as module_pong from './pong';
import * as module_ultimate from './ultimate';
import * as module_json from './json_imp_exp';

export default function GamePage() {
	const [pause, setPause] = React.useState(false);
	const handleClick = () => {
		setPause(!pause);
	};
	useEffect(() => {
		module_pong.setUpGame();
	}, [])

	const styles = {
		myProgress: {
			width: "100%",
			backgroundColor: "#ddd"
		  },

		myBar: {
			width: "0%",
			height: "30px",
			backgroundColor: "#4CBB17"
		  },
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
				<div>
					<p>ULTIME :</p>
						<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_add_ball"onClick={module_ultimate.boost_ult}>
							ADMIN: BOOST ULT
						</button>
						<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult0">
							1: Add a ball
						</a>
						<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult1">
							2 :Paddle Dash
						</a>
						<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult2">
							3: Reduce paddle
						</a>
					<div id="myProgress" style={styles.myProgress}>
						<div id="myBar" style={styles.myBar}>
						</div>
					</div>
				</div>
				<canvas className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="canvas" style={{border: '1px solid rgba(255, 255, 255, 0.85)', backgroundColor: 'rgba(0, 0, 0, 0.85)', width: '100%', maxWidth: '2000px'}}>
				</canvas>
				<script> module_pong.setUpGame(); </script>
			</div>
			<div>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={module_pong.startGame}>
					Start
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_pause" style={{visibility: 'hidden'}} onClick={module_pong.do_pause}>
					Pause
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_restart" style={{visibility: 'hidden'}} onClick={module_pong.restart}>
					restart
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={module_json.exportToJson_pone}>
					export to JSON for P1
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={module_json.exportToJson_ptwo}>
					export to JSON for P2
				</button>
			</div>
			<p>/!CONTROL!\</p>
			<p>W: UP</p>
			<p>S: DOWN</p>
			<p>NUMBERS: ULTIMATE</p>
		</div>
	);
}