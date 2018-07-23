canvas = document.getElementById("mines_canvas");
context = canvas.getContext("2d");
sqr_size = 32;
var mine_count = 200;
var arr_w = canvas.width / sqr_size;
var arr_h = canvas.height / sqr_size;
let val_arr;
let vis_arr;
var curr_row = 0;
context.font = (32 * 0.8) + "px Arial";
var mX;
var mY;
var game_over = false;
var interval;
var started;

reset_game();

canvas.onmousemove = function (e) {
    var rect = canvas.getBoundingClientRect();
    var X = e.clientX - rect.left;
    var Y = e.clientY - rect.top;
    mX = Math.floor(X / sqr_size);
    mY = Math.floor(Y / sqr_size);
}

canvas.onmousedown = function (e) {
    if (!started) {
        place_bombs();
        calc_spaces();
        started = true;
    }
    if (game_over == false) {
        if (e.shiftKey) {
            if (vis_arr[mY][mX] == 0) {
                vis_arr[mY][mX] = 2;
            } else if (vis_arr[mY][mX] == 2) {
                vis_arr[mY][mX] = 0;
            }
        } else {
            if (vis_arr[mY][mX] == 2) {
                vis_arr[mY][mX] = 0;
            } else {
                check_space(mX, mY);
            }
        }
    } else {
        reset_game();
    }
}

function reset_game() {
    game_over = false;
    started = false;
    init_arr();
    interval = setInterval(() => {
        draw_arr();
        check_win();
    }, 1000 / 60);
}

function check_space(x, y) {
    console.log(x + "," + y);
    if (val_arr[y][x] == 0) {
        console.log("checking blanks");
        check_blank(x, y);
    } else {
        vis_arr[y][x] = 1;
    }
}

function check_blank(x, y) {
    vis_arr[y][x] = 1;
    if (val_arr[y][x] == 0) {
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = x + xoff;
                let j = y + yoff;
                if (i >= 0 && i < arr_w && j >= 0 && j < arr_h) {
                    if (!(x == i && y == j)) {
                        if (vis_arr[j][i] == 0) {
                            check_blank(i,j);
                        }
                    }
                }
            }
        }
    }
}

function place_bombs(x,y) {
    for (let i = 0; i < mine_count; i++) {
        do {
            var x = Math.floor(Math.random() * arr_w);
            var y = Math.floor(Math.random() * arr_h);
        } while (val_arr[y][x] == "X" || ((x == mX || x == mX -1 || x == mX + 1) && (y == mY || y == mY -1 || y == mY + 1)));
        val_arr[y][x] = "X";
    }
}

function calc_spaces() {
    for (let y = 0; y < arr_h; y++) {
        for (let x = 0; x < arr_w; x++) {
            if (val_arr[y][x] != "X") {
                val_arr[y][x] = check_neightbours(x, y);
                vis_arr[y][x] = 0;
            }
        }
    }
}

function check_neightbours(x, y) {
    var count = 0;

    for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
            i = x + xoff;
            j = y + yoff;
            if (i >= 0 && i < arr_w && j >= 0 && j < arr_h) {
                if (val_arr[j][i] == "X") {
                    count++;
                }
            }
        }
    }
    return count;
}

function init_arr() {
    val_arr = new Array(arr_h);
    for (let i = 0; i < arr_h; i++) {
        val_arr[i] = new Array(arr_w);
    }
    vis_arr = new Array(arr_h);
    for (let i = 0; i < arr_h; i++) {
        vis_arr[i] = new Array(arr_w);
    }
}

function check_win() {
    var mineless = (arr_h * arr_w) - mine_count;
    for (let y = 0; y < vis_arr.length; y++) {
        for (let x = 0; x < vis_arr[0].length; x++) {
            if (vis_arr[y][x] == 1) {
                if (val_arr[y][x] == "X") {
                    alert("You Lost, Try Again");
                    game_over = true;
                    clearInterval(interval);
                    draw_arr();
                } else {
                    mineless--;
                }
            }
        }
    }
    if (mineless == 0) {
        alert("You won");
        game_over = true;
        clearInterval(interval);
        draw_arr();

    }
}

function draw_arr() {
    // Draw background
    context.fillStyle = "#555555";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#777777";
    context.fillRect(mX * sqr_size, mY * sqr_size, sqr_size, sqr_size);

    for (let y = 0; y < vis_arr.length; y++) {
        for (let x = 0; x < vis_arr[0].length; x++) {
            if (vis_arr[y][x] == 1) {
                context.fillStyle = "#AAAAAA";
                context.fillRect(x * sqr_size, y * sqr_size, sqr_size, sqr_size);
                context.fillStyle = "#000000";
                context.fillText(val_arr[y][x], x * sqr_size + (sqr_size * 0.25), y * sqr_size + (sqr_size * 0.75));
            } else if (vis_arr[y][x] == 2) {
                context.fillStyle = "#FF0000";
                context.fillText("F", x * sqr_size + (sqr_size * 0.25), y * sqr_size + (sqr_size * 0.75));
            }
            if (game_over == true && val_arr[y][x] == "X") {
                context.fillStyle = "#000000";
                context.fillText(val_arr[y][x], x * sqr_size + (sqr_size * 0.25), y * sqr_size + (sqr_size * 0.75));
            }
        }
    }
    context.strokeStyle = "#000000";
    // Draw Horizontal Lines
    for (let y = 1; y < arr_h; y++) {
        context.beginPath();
        context.moveTo(0, y * sqr_size);
        context.lineTo(canvas.width, y * sqr_size);
        context.stroke();
    }
    // Draw Vertical Lines
    for (let x = 1; x < arr_w; x++) {
        context.beginPath();
        context.moveTo(x * sqr_size, 0);
        context.lineTo(x * sqr_size, canvas.height);
        context.stroke();
    }
}