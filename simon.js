///////////////////////////////////////////////////////////
// Necessaries
///////////////////////////////////////////////////////////
var green = $("#green");
var red = $("#red");
var yellow = $("#yellow");
var blue = $("#blue");
var cpuSeq = [];
var userSeq = [];
var numUserMove = 0;
var numCPUMove = 0;
var points = 0;
var round = 2;


//////////
//CPUmove Constructer
//////////
var CPUmove = function CPUmove() {
	this.colors = [green, red, yellow, blue];
}

//////////
//CPUmove Prototypes
//////////
//generate random number
CPUmove.prototype.randNum = function() {
	return Math.floor(Math.random()*this.colors.length);
}

//push a random color derived from calling randNum() into a sequence
CPUmove.prototype.push = function() {
	cpuSeq.push(this.colors[this.randNum()]);
}

//////////
//Usermove Constructer
//////////
var Usermove = function Usermove() {
	this.colors = [green, red, yellow, blue];
}

//////////
//Usermove Prototype
//////////
//click listener 
Usermove.prototype.select = function() {
	green.on("click", function(event) {
		green.toggleClass("on");
		var timeoutID = setTimeout(function() {
			green.toggleClass("on");
		}, 1000);
		return green;
	})

	red.on("click", function(event) {
		red.toggleClass("on");
		var timeoutID = setTimeout(function() {
			red.toggleClass("on");
		}, 1000);
		return red;
	})

	yellow.on("click", function(e) {
		yellow.toggleClass("on");
		var timeoutID = setTimeout(function() {
			yellow.toggleClass("on");
		}, 1000);
		return yellow;
	})

	blue.on("click", function(e) {
		blue.toggleClass("on");
		var timeoutID = setTimeout(function() {
			blue.toggleClass("on");
		}, 1000);
		return blue;
	})
}

//////////
//Game Constructor
//////////
var Game = function Game() {
	//new Usermove.select.call(this);//trying to apply 
	this.seq = [green, red, yellow, green, green, yellow, red, red, yellow, blue, blue, blue];
}

//////////
//Game Prototype
//////////
//trying to bring Usermove methods up to parent
// Game.prototype = Object.create(Usermove.prototype);

//iterates and renders the cpu move sequence
Game.prototype.render = function () {
	for (var i = 0; i < this.seq.length; i++) {
		var hack = this;
    (function(n) {
      window.setTimeout(function() {
        hack.seq[n].toggleClass("on");
        var timeoutID = setTimeout(function() {
        	hack.seq[n].toggleClass("on");
        }, 1000);
    	}, (n * 1500));
  	})(i) 
  }	
}

Game.prototype.usermove = function() {
	green.on("click", function(event) {
		green.toggleClass("on");
		var timeoutID = setTimeout(function() {
			green.toggleClass("on");
		}, 1000);
		return green;
	})

	red.on("click", function(event) {
		red.toggleClass("on");
		var timeoutID = setTimeout(function() {
			red.toggleClass("on");
		}, 1000);
		return red;
	})

	yellow.on("click", function(e) {
		yellow.toggleClass("on");
		var timeoutID = setTimeout(function() {
			yellow.toggleClass("on");
		}, 1000);
		return yellow;
	})

	blue.on("click", function(e) {
		blue.toggleClass("on");
		var timeoutID = setTimeout(function() {
			blue.toggleClass("on");
		}, 1000);
		return blue;
	})
}

//evaluate 
Game.prototype.round = function() {
	for (var i = 0; i < this.seq.length; i++) {
		(function(n) {
      window.setTimeout(function() {
      	var currentmove = this.usermove();
      	if (currentmove != this.seq[n]) {
					alert("Sorry, that was incorrect");
					return false;
				} else {
    			alert("Got it! Ready for the next one?")
    			return true
  			}
    	}, (n * 2000));
  	})(i)
  }
}




// 		if (this.usermove() != this.seq[i]) {
// 			alert("Sorry, that was incorrect");
// 			return false;
// 		}
// 	}
// 	alert("Got it! Ready for the next one?")
// 	return true;
// }

	

 // var numbers = [1, 2, 3, 4, 5];

 //    for (var i = 0; i < numbers.length; i++) {
 //        (function(n){ //anonymous function
 //            window.setTimeout(function(){
 //                console.log(numbers[n])
 //            }, (n * 1000))
 //        })(i) //immediately called passing in i as an argument
 //    }

// // var displayCPUMoves = function() {
// 	for (var i = 0; i < computerSeq.length; i++) {
// 		computerSeq[i].toggleClass("on");

// 		var timeoutID = setTimeout(function() {
// 		colors[randNum].toggleClass("on");
// 		}, 1000);
// 		clearTimeout(timeoutID);
// 	}
// // }

// The game should make the sequence longer each turn


 
// The game should play the sequence to completion before accepting the player's input.


// The player must match the correct color sequence for the game to continue onto the next turn.




// The game should alert the player whether or not they got the sequence correct, and if the game will continue or not.


// The game should be nicely styled.




//generates a random color and fires it
var randomColor = function() {
	var colors = [green, red, yellow, blue];
	var randNum = Math.floor(Math.random()*colors.length);

	computerSeq.push(colors[randNum]);
	colors[randNum].toggleClass("on");
	var timeoutID = setTimeout(function() {
		colors[randNum].toggleClass("on");
	}, 1000);
	computerMove++;
}

var matchChecker = function(userMove) {
	var userMove = userMove
	if (computerSeq[userMove] == userSeq[userMove]) {
		points++;
		return true;
	} else {
		return false;
	}
}

var randomColor = function() {
	var colors = [green, red, yellow, blue];
	var randNum = Math.floor(Math.random()*colors.length);
	computerSeq.push(colors[randNum]);
	colors[randNum].toggleClass("on");
	var timeoutID = setTimeout(function() {
		colors[randNum].toggleClass("on");
	}, 1000);
	computerMove++;
}

$("box")

///////////////////////////////////////////////////////////
// Reach goals
///////////////////////////////////////////////////////////
// Add sound effects.
// Add a high score board that people can add their names to.
// Make the color sequence move faster and faster each round.
// Add a timer that forces the player to match the sequence within the allotted time, or they lose.
// Use Snap.svg to animate the board