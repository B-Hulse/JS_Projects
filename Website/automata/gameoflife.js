var canvas = document.getElementById("golCanvas");
var context = canvas.getContext("2d");
var pSize = 10;
var rate = 10;
var width = canvas.width / pSize;
var height = canvas.height /pSize;
var grid = create2DArray(width,height);
clearGrid()
drawGrid();
var gameLoop;
var playing = false;

function toggleStart()
{
    if (playing == false) {
        playing = true;
        clearInterval(gameLoop);
        gameLoop = setInterval(function() {
            console.log("Loop");
            checkGrid();
            drawGrid();
        }, 1000 / rate);
    }
    else {
        playing = false;
        clearInterval(gameLoop);
    }
}

function clearGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0;
        }
    }
}

function pClick()
{
    if (playing == false)
    {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        x = Math.floor(x/pSize);
        y = Math.floor(y/pSize);

        if (grid[x][y] == 1) {
            console.log(x);
            console.log(y);
            grid[x][y] = 0;
        } else {
            grid[x][y] = 1;
        }
        drawGrid();
    }
}

function checkGrid() {
    let newArr = create2DArray(width,height);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            var c = countNeighbours(i,j);
            if (grid[i][j] == 1 && c != 3 && c != 2) {
                newArr[i][j] = 0;
            }
            else if (grid[i][j] == 0 && c == 3)
            {
                newArr[i][j] = 1;
            }
            else
            {
                newArr[i][j] = grid[i][j];
            }
        }
    }
    grid = newArr;
}

function countNeighbours(x,y) {
    var count = 0;
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            if (i == -1 || i == width || j == -1 || j == height) {
            } else {
                if (grid[i % width][j % height] == 1 && (i != x || j != y)) {
                    count+= 1;
                }
            }
        }
    }
    return count;
}

function randomizeGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
    drawGrid();
}

function create2DArray(w,h) {
    let arr = new Array(w);
    for (let i = 0; i  < arr.length; i++) {
        arr[i] = new Array(h);
    }
    return arr;
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            context.fillStyle="hsla(0, 0%, " + (100 - (100*grid[i][j])) + "%, 1)";
            context.fillRect( i * pSize, j * pSize, pSize, pSize );
        }
    }
}