var counter = 0;
var time = 10;
var started = false;
var timer;
document.getElementById("count").innerHTML = counter;
document.getElementById("timer").innerHTML = "Time: " + time;

var clicked = function() {
	if (!started) {
	timer = setInterval(function() {
			time--;
			document.getElementById("timer").innerHTML = "Time: " + time;
			if (time == 0){
				document.getElementById("button").disabled=true;
				document.getElementById("button").innerHTML="Time up";
				clearInterval(timer);
			}
		}, 1000);
		started = true;
	}
	counter++;
	document.getElementById("count").innerHTML = counter;
}

var restart = function () {
	if (started) {
		if (time > 0) {
			clearInterval(timer);
		}
		time = 10;
		document.getElementById("timer").innerHTML = "Time: " + time;
		started = false;
		document.getElementById("button").disabled=false;
				document.getElementById("button").innerHTML="Click Here";
		counter = 0;
		document.getElementById("count").innerHTML = counter;
	}
}