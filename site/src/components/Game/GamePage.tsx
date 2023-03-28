import React, { useState, useEffect } from "react";
import { CSSProperties } from "react";

import { GameArea } from "./pong";

import * as module_const from './constant'


import { UseGameDto } from "./dto/useGame.dto";

interface GamePageProps {
	gamer: UseGameDto;
}

export default function GamePage({ gamer }: GamePageProps) {

	useEffect(() => {
		gamer.gameArea.current?.get_elements();
		gamer.gameArea.current?.render();

	}, [gamer.gameArea.current])


	const styles = {
		myProgress: {
			width: "100%",
			backgroundColor: "#ddd",
			border: "1px solid black"
		},
		myProgress2: {
			width: "100%",
			backgroundColor: "#ddd",
			border: "1px solid black",
		},
		myBar: {
			width: "0%",
			height: "30px",
			backgroundColor: "#4CBB17"
		},
		myBar2: {
			width: "0%",
			height: "30px",
			backgroundColor: "#4CBB17",
			marginLeft: "auto",
			marginRight: "0"
		},

		myTable: {
			width: "100%",
			backgroundColor: "#CBD18F",
			border: "1px solid black",
			maxWidth: '2000px',
		},
		padding: {
			paddingLeft: "40px",
			paddingRight: "40px"
		},
		myCanvas: {
			border: '1px solid rgba(255, 255, 255, 0.85)',
			backgroundColor: 'rgba(0, 0, 0, 0.85)',
			width: '100%',
			maxWidth: '2000px',
		}
	}



	let keys: string[] = [];
	let controls = ["w", "s", "ArrowUp", "ArrowDown", "1", "2", "3"];
	// let move_actions = ["w", "ArrowUp", "s", "ArrowDown"];

	window.onkeyup = (e: KeyboardEvent): any => {
		if (controls.indexOf(e.key) == -1)
			return;

		let ind = keys.indexOf(e.key);

		if (ind != -1)
			keys.splice(ind, 1);

		// if (!keys.some((action) => { return move_actions.indexOf(action) != -1 }))
			gamer.playGame(keys);

	}

	window.onkeydown = (e: KeyboardEvent): any => {

		if (controls.indexOf(e.key) == -1 || keys.indexOf(e.key) != -1)
			return;

		keys.push(e.key);

		if (keys.length > 0) {
			gamer.playGame(keys);
		}
	}


	return (

		<div className="bg-yellow-400 w-full h-screen">
			<div style={styles.padding}>
				<div >
					<p>ULTIME:</p>
					{ /*<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_add_ball" onClick={() => { gamer.boost_ult() }}>
						ADMIN: BOOST ULT
						</button>*/ }
					<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult0">
						1: Add a ball
					</a>
					<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult1">
						2 :Paddle Dash
					</a>
					<a className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="btn_ult2">
						3: Reduce paddle
					</a>
					<table style={styles.myTable}>
						<thead>
							<tr>
								<td style={{ width: "50%" }}>
									<p style={{ textAlign: 'center', width: "100%" }}>player 1</p>
								</td>
								<td style={{ width: "50%" }}>
									<p style={{ textAlign: 'center', width: "100%" }}>player 2</p>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr >
								<td style={{ width: "50%", paddingRight: "40px" }}>
									<div id="myProgress" style={styles.myProgress}>
										<div id="myBar" style={styles.myBar}>
										</div>
									</div>
								</td>
								<td style={{ width: "50%", paddingLeft: "40px" }}>
									<div id="myProgress2" style={styles.myProgress2}>
										<div id="myBar2" style={styles.myBar2}>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<canvas className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="canvas" style={styles.myCanvas}>
				</canvas>
				<script>  </script>
			</div>
			<div style={styles.padding}>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.createGame() }}>
					Create
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.joinGame() }}>
					Join
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.gameArea.current?.get_elements(); }}>
					Get
				</button>

				{/* <button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gamer.gameArea.current?.startGame() }}>
					Start
				</button> */}
			</div>
			<p>/!CONTROL!\</p>
			<p>W: UP</p>
			<p>S: DOWN</p>
			<p>NUMBERS: ULTIMATE</p>
		</div>
	);
}