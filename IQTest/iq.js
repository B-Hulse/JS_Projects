var canvas = document.getElementById("dbCanv");
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var space_width = canvas.width / 6;
var space_height = Math.sqrt(Math.pow(space_width,2)-Math.pow(space_width/2,2));
var pad_height = (height - (space_height*6)) / 2;
var pad_width;

var game_interval;

// var start = function () {
// 	game_interval = setInterval(function () {
		
// 	}, 10);
// };

function drawDots() {
	context.fillStyle = "#000000";
	for (var i = 1; i <= 5; i++) {
		pad_width = (width - (space_width*(i+1))) / 2;
		for (var j = 1; j <= i; j++) {
			context.beginPath();
			context.arc((space_width * j)+pad_width, (space_height * i) + pad_height, 5, 0, 2 * Math.PI);
			context.fill();
		}
	}
}

drawDots();