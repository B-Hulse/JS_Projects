var counter = 0;
var time = 1000;
var started = false;
var timer;
var times=[];
var lastTime;
document.getElementById("count").innerHTML = counter;
document.getElementById("timer").innerHTML = "Time: " + (time/100);

var clicked = function () {
	if (!started) {
		timer = setInterval(function () {
			time--;
			document.getElementById("timer").innerHTML = "Time: " + (time/100);
			if (time == 0) {
				document.getElementById("button").disabled = true;
				document.getElementById("button").innerHTML = "Time up";
				console.log(times);
				clearInterval(timer);
			}
		}, 10);
		started = true;
	}
	times.push(lastTime-time);
	lastTime = time;
	counter++;
	document.getElementById("count").innerHTML = counter;
}

var restart = function () {
	if (started) {
		if (time > 0) {
			clearInterval(timer);
		}
		time = 1000;
		document.getElementById("timer").innerHTML = "Time: " + (time/1000);
		started = false;
		document.getElementById("button").disabled = false;
		document.getElementById("button").innerHTML = "Click Here";
		counter = 0;
		document.getElementById("count").innerHTML = counter;
		times = [];
		lastTime=0;
	}
}