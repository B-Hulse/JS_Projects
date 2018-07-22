canvas = document.getElementById("mines_canvas");
context = canvas.getContext("2d");
sqr_size = 32;
var mine_count = 50;
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

reset_game();

canvas.onmousemove = function (e) {
    var rect = canvas.getBoundingClientRect();
    var X = e.clientX - rect.left;
    var Y = e.clientY - rect.top;
    mX = Math.floor(X / sqr_size);
    mY = Math.floor(Y / sqr_size);
}

canvas.onmousedown = function (e) {
    if (game_over == false) {
        if (e.shiftKey) {
            if (vis_arr[mY][mX] == 0) {
                vis_arr[mY][mX] = 2;
            } else if (vis_arr[mY][mX] == 2) {
                vis_arr[mY][mX] = 0;
            }
        }
        else {
            if (vis_arr[mY][mX] == 2) {
                vis_arr[mY][mX] = 0;
            }
            else {
                check_space(mX, mY);
            }
        }
    } else {
        reset_game();
    }
}

function reset_game() {
    game_over = false;
    init_arr();
    place_bombs();
    calc_spaces();
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
        if (x > 0 && vis_arr[y][x - 1] == 0) {
            check_blank(x - 1, y);
        }
        if (x > 0 && y > 0 && vis_arr[y - 1][x - 1] == 0) {
            check_blank(x - 1, y - 1);
        }
        if (x > 0 && y < arr_h - 1 && vis_arr[y + 1][x - 1] == 0) {
            check_blank(x - 1, y + 1);
        }
        if (x < arr_w - 1 && vis_arr[y][x + 1] == 0) {
            check_blank(x + 1, y);
        }
        if (x < arr_w - 1 && y > 0 && vis_arr[y - 1][x + 1] == 0) {
            check_blank(x + 1, y - 1);
        }
        if (x < arr_w - 1 && y < arr_h - 1 && vis_arr[y + 1][x + 1] == 0) {
            check_blank(x + 1, y + 1);
        }
        if (y > 0 && vis_arr[y - 1][x] == 0) {
            check_blank(x, y - 1);
        }
        if (y < arr_h - 1 && vis_arr[y + 1][x] == 0) {
            check_blank(x, y + 1);
        }
    }
}

function place_bombs() {
    for (let i = 0; i < mine_count; i++) {
        var x = Math.floor(Math.random() * arr_w);
        var y = Math.floor(Math.random() * arr_h);
        val_arr[y][x] = "X";
        // testing
        vis_arr[y][x] = 0;
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
    if (x > 0) {
        if (val_arr[y][x - 1] == "X") {
            count++;
        }
        if (y > 0) {
            if (val_arr[y - 1][x - 1] == "X") {
                count++;
            }
        }
        if (y < arr_h - 1) {
            if (val_arr[y + 1][x - 1] == "X") {
                count++;
            }
        }
    }
    if (x < arr_w - 1) {
        if (val_arr[y][x + 1] == "X") {
            count++;
        }
        if (y > 0) {
            if (val_arr[y - 1][x + 1] == "X") {
                count++;
            }
        }
        if (y < arr_h - 1) {
            if (val_arr[y + 1][x + 1] == "X") {
                count++;
            }
        }
    }
    if (y > 0) {
        if (val_arr[y - 1][x] == "X") {
            count++;
        }
    }
    if (y < arr_h - 1) {
        if (val_arr[y + 1][x] == "X") {
            count++;
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
            }
            else if (vis_arr[y][x] == 2) {
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