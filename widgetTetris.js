/**
 *	Tetraminos
 *
 *	@author: Orange Marques dos Santos
 *	@email: orangemarques@gmail.com
 *	@site: www.tagcity.com.br
 *	@date: 08.08.2014
 *	@version: 2.0
 */

// Remove scroll.
document.getElementsByTagName("html")[0].style.overflow = "hidden";
document.getElementsByTagName("html")[0].style.overflowX = "hidden";

var _screen = "main";

var $ = function(id) {
    return document.getElementById(id);
};

//////////
var _rotation = $('rotation');
var h_rotation = new Hammer(_rotation);

var _moveLeft = $('moveLeft');
var h_moveLeft = new Hammer(_moveLeft);

var _moveRight = $('moveRight');
var h_moveRight = new Hammer(_moveRight);

var _moveDown = $('moveDown');
var h_moveDown = new Hammer(_moveDown);

h_rotation.on("tap", function(ev) {
	action('rotation');
});

h_moveLeft.on("tap", function(ev) {
	action('left');
});

h_moveRight.on("tap", function(ev) {
	action('right');
});

h_moveDown.on("tap", function(ev) {
	action('drop');
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
}
function onError() {
}
//////////



var SPEED_LEVEL_01 = 1000;
var SCREEN_W = window.innerWidth;
var SCREEN_H = window.innerHeight;
var TETROMINOS = ['O','I','S','Z','L','J','T'];

var _action = null;
var rand_tetromino = TETROMINOS[Math.round(Math.random()*6)];
var y = 1;
var x = 3;
var offset = 0;
var score = 0;

var board_matrix = [
	[2,2,2,2,2,2,2,2,2,2,2,2],
	[2,2,2,2,2,2,2,2,2,2,2,2],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
];

var BOARD_LINES = board_matrix.length;
var BOARD_ROWS = board_matrix[0].length;

function init() {
	createBackground();
	createBoard();
	cleanNext();
}

function reset() {
	SPEED_LEVEL_01=1000;
	y=1;
	x=3;
	offset=0;
}

function start() {
	document.addEventListener("backbutton", onBackKeyDown, false);
	hideMenu();
	_screen = "game";
	reset();
	tetromino.action.obj = eval("tetromino."+rand_tetromino);
	tetromino.action.show();
	_action = setInterval(down,SPEED_LEVEL_01);
	rand_tetromino = TETROMINOS[Math.round(Math.random()*6)];
	next();
}

function next() {
	_obj = eval("tetromino."+rand_tetromino);

	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			$("n"+j+""+i).style.backgroundColor = "";
			if (_obj.matrix[j][i]==1) {
				$("n"+j+""+i).style.backgroundColor = _obj.color;
			}
		}
	}
}

function cleanNext() {
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			$("n"+j+""+i).style.backgroundColor = "";
		}
	}
}

function restart() {
	_screen = "game";
	cleanBoard();
	reset();
	start();
	$("score_value").innerHTML = 0;
}

function resume() {
	_screen = "game";
	hideMenu();
	_action = setInterval(down,SPEED_LEVEL_01);
}

function down() {
	tetromino.action.down();
}

function action(move) {
	if (move == "left") {
		tetromino.action.left();

	} else if (move == "right") {
		tetromino.action.right();

	} else if (move == "drop") {
		tetromino.action.drop();

	} else if (move == "rotation") {
		tetromino.action.rotation();
	}
}

function createBackground() {
	var block = "";
	var w = SCREEN_W/BOARD_ROWS;
	var h = SCREEN_H/BOARD_LINES;

	for (var i=0; i<BOARD_LINES; i++) {
		for (var j=0; j<BOARD_ROWS; j++) {
			if (board_matrix[i][j]==0) {
				bg = ((i+j)%2==0)?"#111111":"#222222";
				opacity = 0.15;
			} else {
				bg = "#000000";
				opacity = 0;
			}

			block += "<div style=\"background-color:"+bg+"; opacity:"+opacity+"; float:left; width:"+w+"px; height:"+h+"px\"></div>";
		}
	}

	$("background").innerHTML = block;
	block = null;
}

function createBoard() {
	var block = "";
	var w = (SCREEN_W/BOARD_ROWS);
	var h = (SCREEN_H/BOARD_LINES);
	
	//var w = (SCREEN_W/BOARD_ROWS)-2.0;
	//var h = (SCREEN_H/BOARD_LINES)-2.0;

	for (var i=0; i<BOARD_LINES; i++) {
		for (var j=0; j<BOARD_ROWS; j++) {
			block += "<div id=\""+j+"_"+i+"\" style=\"float:left; width:"+w+"px; height:"+h+"px\"></div>"; //border:1px solid #000000;
		}
	}

	$("board").innerHTML = block;
	block = null;
}

function cleanBoard() {
	for (var i=1; i<11; i++) {
		for (var j=2; j<22; j++) {
			$(i+"_"+j).style.backgroundColor = "";
			board_matrix[j][i] = 0;
		}
	}
}

function checkLine() {
	for (var i=y; i<y+4; i++) {
		if (i < 22) {
			var bingo = true;

			for(var j=1; j<11; j++){
				if (board_matrix[i][j] == 0) {
					bingo = false;
				}
			}

			if (bingo) {
				/*
				 * Phonegap function 
				 * :: notification.vibrate
				 * :: Vibrates the device for the specified amount of time.
				 */
				//navigator.vibrate(500);

				cleanLine(i);
				downBlocks(i);
			}
		}
	}
}

function cleanLine(line) {
	for (var i=1; i<BOARD_ROWS-1; i++) {
		$(i+"_"+line).style.backgroundColor = "";
		board_matrix[line][i] = 0;
	}
	$("score_value").innerHTML = eval($("score_value").innerHTML)+10;
}

function downBlocks(line) {
	for(var i=line; i>2; i--) {
		for (var j=1; j<BOARD_ROWS-1; j++) {
			$(j+"_"+i).style.backgroundColor = $(j+"_"+(i-1)).style.backgroundColor;
			board_matrix[i][j] = board_matrix[i-1][j];
		}
		cleanLine(i-1);
	}
}

function hideMenu() {
	$("menu").style.display = "none";
	$("game_over").style.display = "none";
}

function hideAbout() {
	document.removeEventListener("backbutton", onBackKeyDown, false);
	$("about").style.display = "none";
}

function pause() {
	_screen = "pause";
	clearInterval(_action);
	$("start").style.display = "none";
	$("resume").style.display = "block";
	$("restart").style.display = "block";
	$("menu").style.display = "inline";
	$("_about").style.display = "none";
	$("_main").style.display = "block";
}

function about() {
	document.addEventListener("backbutton", onBackKeyDown, false);

	_screen = "about";
	$("about").style.display = "inline";
}

function gameOver() {
	_screen = "gameover";
	clearInterval(_action);

	$("start").style.display = "none";
	$("game_over").style.display = "inline";
	$("restart").style.display = "block";
	$("_about").style.display = "none";
	$("resume").style.display = "none";
	$("menu").style.display = "inline";

	score = $("score_value").innerHTML;
}

function _main() {
	document.removeEventListener("backbutton", onBackKeyDown, false);
	_screen = "main";
	clearInterval(_action);
	
	cleanBoard();
	reset();

	$("game_over").style.display = "none";
	$("about").style.display = "none";
	$("start").style.display = "block";
	$("resume").style.display = "none";
	$("restart").style.display = "none";
	$("_main").style.display = "none";
	$("_about").style.display = "block";
	$("menu").style.display = "inline";
	init();
}

function onBackKeyDown() {
    if(_screen == "game") {
        pause();

    } else if(_screen == "pause") {
        resume();

    } else if(_screen == "about") {
        _main();

    } else if(_screen = "gameover") {
		_main();
	}
}