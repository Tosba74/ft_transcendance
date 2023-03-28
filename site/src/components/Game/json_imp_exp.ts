import * as module_pong from "./pong"

export function exportToJson_pone() //when button export pressed
{
	//console.log(JSON.stringify({ Scoreplayer1: playerOne_points, Scoreplayer2: playerTwo_points, Yplayer1: playerOne.y, Yplayer2: playerTwo.y, Xball: ball.x, Yball: ball.y }));
	//let dataStr = JSON.stringify({ Scoreplayer1: playerOne_points, Scoreplayer2: playerTwo_points, Yplayer1: playerOne.y, Yplayer2: playerTwo.y, Xball: ball.x, Yball: ball.y });
	//let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
	//let exportFileDefaultName = 'data.json';
	//let linkElement = document.createElement('a');
	//linkElement.setAttribute('href', dataUri);
	//linkElement.setAttribute('download', exportFileDefaultName);
	//linkElement.click();


	// console.log(JSON.stringify({ player_1: module_pong.myGameArea.playerOne, ball: module_pong.myGameArea.ball, player_2: module_pong.myGameArea.playerTwo }));
}

export function exportToJson_ptwo() //when button export pressed
{
	//let dataStr = JSON.stringify({ Scoreplayer1: playerOne_points, Scoreplayer2: playerTwo_points, Yplayer1: playerOne.y, Yplayer2: playerTwo.y, Xball: ball.x, Yball: ball.y });
	//let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
	//let exportFileDefaultName = 'data.json';
	//let linkElement = document.createElement('a');
	//linkElement.setAttribute('href', dataUri);
	//linkElement.setAttribute('download', exportFileDefaultName);
	//linkElement.click();


	// console.log(JSON.stringify({ movement: module_pong.myGameArea.playerTwo.last_input, ultimate: module_pong.myGameArea.playerTwo.ultimate }));
}

function ImportJson(value: any) //when command ImportJson is written
{
	//myGameArea.playerOne_points = value.Scoreplayer1;
	//myGameArea.playerTwo_points = value.Scoreplayer2;
	//myGameArea.playerOne.y = value.Yplayer1;
	//myGameArea.playerTwo.y = value.Yplayer2;
	//ball.x = value.Xball;
	//ball.y = value.Yball;
}