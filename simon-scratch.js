///////////////////////////////////////////////////////////
// Necessaries
///////////////////////////////////////////////////////////
// The game should display a randomly generated color sequence.
// The game should make the sequence longer each turn.
// The game should play the sequence to completion before accepting the player's input.
// The player must match the correct color sequence for the game to continue onto the next turn.
// The game should alert the player whether or not they got the sequence correct, and if the game will continue or not.
// The game should be nicely styled.

var green = $("#green");
var red = $("#red");
var yellow = $("#yellow");
var blue = $("#blue");
var gamesquares = $(".gamesquare");

// var computerSeq = [];
// var userSeq = [];
// var userMove = 0;
// var computerMove = 0;
// var points = 0;

var userSelection = function() {
	green.on("click", function(e) {
		green.toggleClass("on");
		this.userSeq.push(green);
		var timeoutID = setTimeout(function() {
			green.toggleClass("on");
		}, 1000);
		this.userMove++
	})

	red.on("click", function(e) {
		red.toggleClass("on");
		this.userSeq.push(red);
		var timeoutID = setTimeout(function() {
			red.toggleClass("on");
		}, 1000);
		this.userMove++
	})

	yellow.on("click", function(e) {
		yellow.toggleClass("on");
		this.userSeq.push(yellow);
		var timeoutID = setTimeout(function() {
			yellow.toggleClass("on");
		}, 1000);
		this.userMove++
	})

	blue.on("click", function(e) {
		blue.toggleClass("on");
		this.userSeq.push(blue);
		var timeoutID = setTimeout(function() {
			blue.toggleClass("on");
		}, 1000);
		this.userMove++
	})
}


//generates a random color and fires it
var randomColor = function() {
	var colors = [green, red, yellow, blue];
	var randNum = Math.floor(Math.random()*colors.length);

	this.computerSeq.push(colors[randNum]);
	colors[randNum].toggleClass("on");
	var timeoutID = setTimeout(function() {
		colors[randNum].toggleClass("on");
	}, 1000);
	this.computerMove++;
}

var matchChecker = function(userMove) {
	var userMove = this.userMove
	if (this.computerSeq[userMove] == this.userSeq[userMove]) {
		this.points++;
		return true;
	} else {
		return false;
	}
}

var randomColor = function() {
	var colors = [green, red, yellow, blue];
	var randNum = Math.floor(Math.random()*colors.length);
	this.computerSeq.push(colors[randNum]);
	colors[randNum].toggleClass("on");
	var timeoutID = setTimeout(function() {
		colors[randNum].toggleClass("on");
	}, 1000);
	this.computerMove++;
}

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
var green = $("#green");
var red = $("#red");
var yellow = $("#yellow");
var blue = $("#blue");


var Game = function Game(playername) {
	this.colors = [green, red, yellow, blue];

	this.playername = playername ? playername : window.prompt("What's your name player?");
	this.colors =
	this.computerSeq = [];
	this.computerMove = 0;
	this.userSeq = [];
	this.userMove = 0;
	this.points = 0;

	window.confirm("Ready to play "+ this.playername +"?")


}



var Round = function Round() {

	this.moveCPU = function() {
		var randNum = Math.floor(Math.random()*colors.length);
		this.computerSeq.push(colors[randNum]);
		colors[randNum].toggleClass("on");
		var timeoutID = setTimeout(function() {
			colors[randNum].toggleClass("on");
		}, 1000);
		this.computerMove++;
	}
	this.moveUser = function() {
		green.on("click", function(e) {
			green.toggleClass("on");
			userSeq.push(green);
			var timeoutID = setTimeout(function() {
				green.toggleClass("on");
			}, 1000);
			userMove++
		})

		red.on("click", function(e) {
			red.toggleClass("on");
			this.userSeq.push(red);
			var timeoutID = setTimeout(function() {
				red.toggleClass("on");
			}, 1000);
			this.userMove++
		})

		yellow.on("click", function(e) {
			yellow.toggleClass("on");
			this.userSeq.push(yellow);
			var timeoutID = setTimeout(function() {
				yellow.toggleClass("on");
			}, 1000);
			this.userMove++
		})

		blue.on("click", function(e) {
			blue.toggleClass("on");
			this.userSeq.push(blue);
			var timeoutID = setTimeout(function() {
				blue.toggleClass("on");
			}, 1000);
			this.userMove++
		})
	}

	this.match = function(userMove) {
		var userMove = this.userMove
		if (this.computerSeq[userMove] == this.userSeq[userMove]) {
			this.points++;
			return true;
		} else {
			return false;
		}
	}
}



///////////////////////////////////////////////////////////
// Reach goals
///////////////////////////////////////////////////////////
// Add sound effects.
// Add a high score board that people can add their names to.
// Make the color sequence move faster and faster each round.
// Add a timer that forces the player to match the sequence within the allotted time, or they lose.
// Use Snap.svg to animate the board
//