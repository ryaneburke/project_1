///////////////////////////////////////////////////////////
//--------------Global Variables
///////////////////////////////////////////////////////////
var green = $("#green");
var red = $("#red");
var yellow = $("#yellow");
var blue = $("#blue");
var enabled = false;
var activeGame = true;
var hof = [];

///////////////////////////////////////////////////////////
//--------------Event Listeners
///////////////////////////////////////////////////////////
green.on("click", function(event) {
	if(enabled) {
		currentgame.logic.currentmove.push("green");
		green.addClass("on");
		var timeoutID = setTimeout(function() {
			green.removeClass("on");
		}, 1000);
	}
})

red.on("click", function(event) {
	if(enabled) {
		currentgame.logic.currentmove.push("red");
		red.addClass("on");
		var timeoutID = setTimeout(function() {
			red.removeClass("on");
		}, 1000);
	}
})

yellow.on("click", function(e) {
	if(enabled) {
		currentgame.logic.currentmove.push("yellow");
		yellow.addClass("on");
		var timeoutID = setTimeout(function() {
			yellow.removeClass("on");
		}, 1000);
	}
})

blue.on("click", function(e) {
	if(enabled) {
		currentgame.logic.currentmove.push("blue");
		blue.addClass("on");
		var timeoutID = setTimeout(function() {
			blue.removeClass("on");
		}, 1000);
	}
})

///////////////////////////////////////////////////////////
//--------------Logic Object
///////////////////////////////////////////////////////////
//Logic Constructor
var Logic = function Logic() {
	this.colorsObj = [green, red, yellow, blue];
	this.colorsStr = ["green", "red", "yellow", "blue"];
	this.seqObj = [];
	this.seqStr = [];
	this.currentIndex = 0;
	this.currentmove = [];
}
//randNum generator
Logic.prototype.randNum = function() {
	return Math.floor(Math.random()*this.colorsObj.length);
}
//push a random color into Logic seq
Logic.prototype.newColor = function() {
	var rand = this.randNum();
	this.seqObj.push(this.colorsObj[rand])
	this.seqStr.push(this.colorsStr[rand]);
}
//advances game to the next round
Logic.prototype.nextRound = function() {
	this.newColor();
}
//checking click event against match
Logic.prototype.checkMatch = function() {
	if (this.currentmove[this.currentIndex] == this.seqStr[this.currentIndex]) {
		return true;
	} else {
		return false;
	}
}
//resets the game in case of incorrect guess
Logic.prototype.gameReset = function() {
	this.currentIndex = 0;
	this.seqObj = [];
	this.seqStr = [];
}

///////////////////////////////////////////////////////////
//----------------Game Object
///////////////////////////////////////////////////////////	
//Game constructor
var Game = function Game(name) {
	this.name = name ? name : window.prompt("what's your name, player?");
	this.logic = new Logic();;
	this.currentmove = this.logic.currentmove;
	this.currentIndex = this.logic.currentIndex;
}
//render engine iterating through Logic.seq
Game.prototype.render = function () {
	enabled = false;
	for (var i = 0; i < this.logic.seqObj.length; i++) {
		var hack = this;
    (function(n) {
      window.setTimeout(function() {
        hack.logic.seqObj[n].addClass("on");
        var timeoutID = setTimeout(function() {
        	hack.logic.seqObj[n].removeClass("on");
        	if (n = hack.logic.seqObj.length) {
        		enabled = true;
        	}
        }, 1000);
    	}, (n * 1500));
  	})(i); 
  }	
}
Game.prototype.win = function() {
	this.logic.nextRound();
	this.logic.currentIndex++;
	this.render();
}
Game.prototype.lose = function() {
	window.alert("You lose");
	hof.push(this);
	activeGame = false;
	this.logic.gameReset();
}


///////////////////////////////////////////////////////////
//-----------------Load Event
///////////////////////////////////////////////////////////

window.onload = function() {

	window.currentgame = new Game(name);
	window.alert("Ready to play "+ name + "?")

		enabled = false;
		currentgame.logic.newColor();
		currentgame.render();
		enabled = true;
		if(enabled) {
			if(currentgame.currentmove[currentgame.currentIndex] == currentgame.logic.seqStr[currentgame.currentIndex]) {
				currentgame.win();
			} else {		
				currentgame.lose();
			}
		}
}

	


///////////////////////////////////////////////////////////
//BULLSHIT
///////////////////////////////////////////////////////////


//evaluate for match based on new Usermove
Game.prototype.round = function() {
	for (var i = 0; i < this.seq.length; i++) {
		var currentmove = new this.usermove();
		(function(n) {
      window.setTimeout(function() {
      	if (currentmove != this.seq[n]) {
					alert("Sorry, that was incorrect");
					return false;
  			}
    	}, (n * 2000));
  	})(i)
		alert("Got it! Ready for the next one?")
		return true
  }
}




///////////////////////////////////////////////////////////
// MVP
///////////////////////////////////////////////////////////
// The game should make the Logic longer each turn
// The game should play the Logic to completion before accepting the player's input.
// The player must match the correct color Logic for the game to continue onto the next turn.
// The game should alert the player whether or not they got the Logic correct, and if the game will continue or not.
// The game should be nicely styled.

///////////////////////////////////////////////////////////
// Reach goals
///////////////////////////////////////////////////////////
// Add sound effects.
// Add a high score board that people can add their names to.
// Make the color Logic move faster and faster each round.
// Add a timer that forces the player to match the Logic within the allotted time, or they lose.
// Use Snap.svg to animate the board