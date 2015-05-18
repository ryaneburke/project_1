///////////////////////////////////////////////////////////
//--------------Global Variables
///////////////////////////////////////////////////////////
var green = $("#green");
var red = $("#red");
var yellow = $("#yellow");
var blue = $("#blue");
var enabled = false;
var hallOfFame = [];


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
	this.colorsObj = [green, red, blue, yellow];
	this.colorsStr = ["green", "red", "blue", "yellow"];
	this.seqObj = [];
	this.seqStr = [];
	this.turn = 0;
	this.level = 1;
	this.active = true;
	this.currentmove = [];
}
Logic.prototype = {
	//randNum generator	
	randNum: function() {
		return Math.floor(Math.random()*this.colorsObj.length);
	},
	//push a random color into Logic seq
	newColor: function() {
		var rand = this.randNum();
		this.seqObj.push(this.colorsObj[rand]);
		this.seqStr.push(this.colorsStr[rand]);
	},
	//advances game to the next round
	nextRound: function() {
		this.turn = 0;
		this.currentmove = [];
		this.newColor();
	},
	//checking click event against match
	checkMatch: function() {
		if(this.currentmove[this.turn] != this.seqStr[this.turn]) {
			return false;
		} else {
			this.turn++;
		}
		if (this.turn === this.seqObj.length) {
			this.level++;
			enabled = false;
			return true;
		}
	},
	//resets the game in case of incorrect guess
	gameReset: function() {
		this.level = 1;
		this.turn = 0;
		this.seqObj = [];
		this.seqStr = [];
		this.currentmove = [];
	}
}


///////////////////////////////////////////////////////////
//----------------Game Object
///////////////////////////////////////////////////////////	
//Game constructor
var Game = function Game(name) {
	// this.name = name ? name : window.prompt("What's your name, player?");
	this.logic = new Logic();
}

Game.prototype = {
	//render engine iterating through this.logic.seqObj
	render: function () {
		enabled = false;
		for (var i = 0; i < this.logic.seqObj.length; i++) {
			var that = this;
	    (function(n) {
	      window.setTimeout(function() {
	        that.logic.seqObj[n].addClass("on");
	        var timeoutID = setTimeout(function() {
	        	that.logic.seqObj[n].removeClass("on");
	        	if (n = that.logic.seqObj.length) {
	        		enabled = true;
	        	}
	        }, 1000);
	    	}, (n * 1500));
	  	})(i); 
	  }	
	},
	//updating the level h2 with current level
	renderLevel: function() {
		$("#level").text("Level: " + this.logic.level)
	},
	nextLevel: function() {

		if(checkMatch() == true) {
			this.logic.nextRound();
			this.logic.level++;
			this.render();
		}
	},
	lose: function() {
		if(checkMatch() == false) {
			window.alert("You lose");
			hallOfFame.push(this);
			active = false;
			this.logic.gameReset();
		}
	},
	init: function() {
		// window.alert("Ready to play "+ this.name + "?");
		var that = this;
		$("#start").on("click", function() {
			that.logic.newColor();
			that.render();
		})
	}
}


///////////////////////////////////////////////////////////
//-----------------Load Event
///////////////////////////////////////////////////////////

window.onload = function() {

	window.currentgame = new Game(name);
	currentgame.init();
}

// 	currentgame.logic.newColor();
// 	currentgame.render();
// 	enabled = true;

// 	while(activeGame) {
// 		console.log("1");
// 		var promise = new Promise(function(fulfill, reject) {
// 			var n = currentgame.currentmove[currentgame.currentIndex];
// 			if(n == currentgame.logic.seqStr[currentgame.currentIndex]) {
// 					fulfill(n);
// 				} else {
// 					reject(n);
// 				}
// 				console.log("2");
// 		});

// 		promise.then(function(match) {
// 			currentgame.win();
// 		}, function(match) {
// 			currentgame.lose();
// 		});
// 		console.log("3");
// 	}
// }




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