import React, { useState, useEffect } from "react";

import { GameArea } from "./pong";

import * as module_const from './constant'
import * as module_ultimate from './ultimate';



export default function GamePage() {
	const [pause, setPause] = React.useState(false);
	const handleClick = () => {
		setPause(!pause);
	};


	let gameArea: GameArea = new GameArea();


	useEffect(() => {
		// gameArea = new GameArea();
		// gameArea.setUpGame();
	}, [])


	window.onkeyup = (e: KeyboardEvent): any => {
		if (e.key == "w")
			if (gameArea.playerOne.speedY <= 0)
				gameArea.playerOne.speedY = 0;

		if (e.key == "s")
			if (gameArea.playerOne.speedY >= 0)
				gameArea.playerOne.speedY = 0;

		if (e.key == "ArrowUp")//up
			if (gameArea.playerTwo.speedY <= 0)
				gameArea.playerTwo.speedY = 0;

		if (e.key == "ArrowDown") //down
			if (gameArea.playerTwo.speedY >= 0)
				gameArea.playerTwo.speedY = 0;
	}

	window.onkeydown = (e: KeyboardEvent): any => {
		if (e.key == "w") {
			gameArea.playerOne.last_input = false;
			if (gameArea.playerOne.y >= 0)
				gameArea.playerOne.speedY = -(module_const.paddle_speed);
		}

		if (e.key == "s") {
			gameArea.playerOne.last_input = true;
			if (gameArea.playerOne.y + gameArea.playerOne.height < module_const.canvas_height)
				gameArea.playerOne.speedY = module_const.paddle_speed;
		}

		if (e.key == "ArrowUp")//up
			if (gameArea.playerTwo.y >= 0)
				gameArea.playerTwo.speedY = -(module_const.paddle_speed);

		if (e.key == "ArrowDown") //down
			if (gameArea.playerTwo.y + gameArea.playerTwo.height < module_const.canvas_height)
				gameArea.playerTwo.speedY = module_const.paddle_speed;
		if (e.key == "1") //ult
		{
			if (gameArea.playerOne.ultimate >= 100) {
				gameArea.playerOne.addABALL = true;
				gameArea.playerOne.ultimate = 0;
			}
		}

		if (e.key == "2") //ult
		{
			if (gameArea.playerOne.ultimate >= 100) {

				module_ultimate.paddle_dash(gameArea.playerOne);

				gameArea.playerOne.ultimate = 0;
			}
		}

		if (e.key == "3") //ult
		{
			if (gameArea.playerOne.ultimate >= 100) {

				module_ultimate.paddle_reduce(gameArea.playerTwo);

				gameArea.playerOne.ultimate = 0;
			}
		}
	}


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
					<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_add_ball" onClick={() => { gameArea.boost_ult() } }>
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
				<canvas className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" id="canvas" style={{ border: '1px solid rgba(255, 255, 255, 0.85)', backgroundColor: 'rgba(0, 0, 0, 0.85)', width: '100%', maxWidth: '2000px' }}>
				</canvas>
				<script>  </script>
			</div>
			<div>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_start" onClick={() => { gameArea.get(); gameArea.startGame() }}>
					Start
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_pause" style={{ visibility: 'hidden' }} onClick={() => { gameArea.do_pause() }}>
					Pause
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" id="btn_restart" style={{ visibility: 'hidden' }} onClick={() => { gameArea.restart() }}>
					restart
				</button>
				{/* <button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={gameArea.exportToJson_pone}>
					export to JSON for P1
				</button>
				<button className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300" type="button" style={{visibility: 'hidden'}} id="btn_exportToJson" onClick={gameArea.exportToJson_ptwo}>
					export to JSON for P2
				</button> */}
			</div>
			<p>/!CONTROL!\</p>
			<p>W: UP</p>
			<p>S: DOWN</p>
			<p>NUMBERS: ULTIMATE</p>
		</div>
	);
}

