///////////////////////////////////////////////////////////
//--------------Global Variables
///////////////////////////////////////////////////////////
var green = $("#green");
var red = $("#red");
var blue = $("#blue");
var yellow = $("#yellow");
var enabled = true;
var hallOfFame = [];


///////////////////////////////////////////////////////////
//--------------Event Listeners
///////////////////////////////////////////////////////////
var elements = ["green", "red", "blue", "yellow"]

var addClick = function(colorStr) {
	var colorObj = $("#" + colorStr);
	colorObj.on("click", function(event) {
		if(enabled) {
			currentgame.currentmove.push(colorStr);
			colorObj.addClass("on");
			var timeoutID = setTimeout(function() {
				colorObj.removeClass("on");
			}, 300);
			currentgame.checkMatch();
		}
	})
}

for (var z = 0; z < elements.length; z++) {
	addClick(elements[z]);
}


///////////////////////////////////////////////////////////
//----------------Game Object
///////////////////////////////////////////////////////////	
//Game constructor
var Game = function Game() {
	this.name = undefined;
	this.colorsObj = [green, red, blue, yellow];
	this.colorsStr = ["green", "red", "blue", "yellow"];
	this.seqObj = [];
	this.seqStr = [];
	this.turn = 0;
	this.level = 1;
	this.currentmove = [];
};

Game.prototype = {
	//randNum generator	
	randNum: function() {
		return Math.floor(Math.random()*this.colorsObj.length);
	},
	//push a random color into seq
	newColor: function() {
		var rand = this.randNum();
		this.seqObj.push(this.colorsObj[rand]);
		this.seqStr.push(this.colorsStr[rand]);
	},
	//updating the level h2 with current level
	renderLevel: function() {
		$("#level").text("LEVEL: " + this.level);
	},
	//advances game to the next round
	nextLevel: function() {
		this.newColor();
		this.turn = 0;
		this.currentmove = [];
		this.level++;
		this.renderLevel();
		this.render();
	},
	//checking click event against match
	checkMatch: function() {
		if(this.currentmove[this.turn] != this.seqStr[this.turn]) {
			hallOfFame.push(currentgame);
			this.lose();
			return false;
		} else {
			this.turn++;
		}
		if(this.turn === this.seqStr.length) {
			enabled = false;
			var that = this;
      var timeoutID = setTimeout(function() {
      	that.nextLevel();
      }, 1000);
		}
	},
	//resets the game in case of incorrect guess
	gameReset: function() {
		this.level = 1;
		this.turn = 0;
		this.seqObj = [];
		this.seqStr = [];
		this.currentmove = [];
	},
	//render engine iterating through this.seqObj
	render: function () {
		enabled = false;
		for(var i = 0; i < this.seqObj.length; i++) {
			var that = this;
	    (function(n) {
	      window.setTimeout(function() {
	        that.seqObj[n].addClass("on");
	        var timeoutID = setTimeout(function() {
	        	that.seqObj[n].removeClass("on");
	        	if(n+1 == that.seqObj.length) { //n will always be short of the length, so + 1 to length to fulfill conditional
	        		enabled = true;
	        	}
	        }, 500);
	    	}, (n * 1000));
	  	})(i); 
	  }	
	},
	lose: function() {
		$("#level").text("GAME OVER");
		// this.name = window.prompt("You lost.\nBut not a bad effort.\nWhat's your name partner?");
		this.gameReset();
	},
	init: function() {
		var that = this;
		$("#start").on("click", function() {
			that.renderLevel();
			that.newColor();
			that.render();
		});
	}
};


///////////////////////////////////////////////////////////
//-----------------Load Event
///////////////////////////////////////////////////////////

window.onload = function() {

	window.currentgame = new Game(name);
	currentgame.init();
};





///////////////////////////////////////////////////////////
//WORK AREA
///////////////////////////////////////////////////////////
//quickly cycle all the colors on load
// startAnimation = function () {
// 		enabled = false;
// 		var colors = [green, red, blue, yellow]
// 		for (var i = 0; i < colors.length; i++) {
// 			var that = this;
// 	    (function(n) {
// 	      window.setTimeout(function() {
// 	        colors[n].addClass("on");
// 	        var timeoutID = setTimeout(function() {
// 	        	colors[n].removeClass("on");
// 	        	if (n = colors.length) {
// 	        		enabled = true;
// 	        	}
// 	        }, 250);
// 	    	}, (n * 500));
// 	  	})(i); 
// 	  }	
// 	},


///////////////////////////////////////////////////////////
//DONE AND DONE
///////////////////////////////////////////////////////////
// refactor code - event listeners, gameReset

///////////////////////////////////////////////////////////
//THINGS TO ADD
///////////////////////////////////////////////////////////
// figure out how to push currentgame to hallOfFame before level is cleared back to 1 in gameReset
// sounds
// start-up animation
// hall of fame array of objects
// scroll hall of fame across footer
// lose event - full-screen .5 opacity div that slides in with userinput for name
// responsive design


///////////////////////////////////////////////////////////
// MVP
///////////////////////////////////////////////////////////
// The game should make the longer each turn
// The game should play the to completion before accepting the player's input.
// The player must match the correct color for the game to continue onto the next turn.
// The game should alert the player whether or not they got the correct, and if the game will continue or not.
// The game should be nicely styled.

///////////////////////////////////////////////////////////
// Reach goals
///////////////////////////////////////////////////////////
// Add sound effects.
// Add a high score board that people can add their names to.
// Make the color move faster and faster each round.
// Add a timer that forces the player to match the within the allotted time, or they lose.
// Use Snap.svg to animate the board