var canvas = document.getElementById("dbCanv");
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var lineLength = width / 5;

// 0 = Unowned, 1 = Blue, 2 = Red
var vLines = [];
var hLines = [];

var currentPlayer = 1;

var game;


var start = function () {
	game = setInterval(function () {
		
	}, 10);
};

var checkLines = function () {
	context.fillStyle="#E0115F";
	for (var j = 0; j < 4; j++) {
		var y = lineLength + (j * lineLength);
		for (var i = 0; i < 3; i++) {
			var x = lineLength + ((i + 0.5) * lineLength);
			//check distance form center of thing
			if (findDist(x, y) <= (lineLength / 5)) {
				context.moveTo(x - (lineLength/2), y);
				context.lineTo(x + (lineLength/2), y);
				context.stroke();
			}
		}
	}
}

checkLines = function(e) {
	context.strokeStyle="#E0115F";
	for (var j = 0; j < 4; j++) {
		var y = lineLength + (j * lineLength);
		for (var i = 0; i < 3; i++) {
			var x = lineLength + ((i + 0.5) * lineLength);
			//check distance form center of thing
			if (findDist(x, y, e) <= (lineLength / 2)) {
				context.moveTo(x - (lineLength/2), y);
				context.lineTo(x + (lineLength/2), y);
				context.stroke();
				return null;
			}
		}
	}
}

function findDist(x1, y1, e) {	
	var mPos = getMousePos(canvas, e);
	return Math.sqrt(Math.pow(x1 - mPos.x, 2) + Math.pow(y1 - mPos.y, 2))
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.pageX - rect.left,
		y: evt.pageY - rect.top
	};
}

var drawDots = function () {
	context.fillStyle = "#000000";
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {
			context.beginPath();
			context.arc(i * lineLength, j * lineLength, 5, 0, 2 * Math.PI);
			context.fill();
		}
	}
}

var clearLines = function () {
	for (var i = 0; i < 12; i++) {
		vLines[i] = 0;
		hLines[i] = 0;
	}
}

var drawLines = function () {
	// Vertical Lines
	context.lineWidth = 5;
	context.strokeStyle = "#909090";
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 4; j++) {
			context.moveTo(i * lineLength, j * lineLength);
			context.lineTo(i * lineLength, (j + 1) * lineLength);
			context.stroke();
		}
	}
	// Horizontal Lines
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 4; j++) {
			context.moveTo(j * lineLength, i * lineLength);
			context.lineTo((j + 1) * lineLength, i * lineLength);
			context.stroke();
		}
	}
}

drawLines();
drawDots();
canvas.onmousemove = function(e) { 
	drawLines();
	checkLines(e);
	drawDots();
}