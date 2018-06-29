var canvas = document.getElementById("golCanvas");
var context = canvas.getContext("2d");
var pSize = 5;
var rate = 1000;
var width = canvas.width / pSize;
var height = canvas.height /pSize;
var grid = create2DArray(width,height);
var antx = Math.round((width + 1) /2);
var anty = Math.round((height + 1) /2);
// N E S W
var antd = 3;
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
            moveAnt();
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

function moveAnt() {
    if (grid[antx][anty]==1)    
    {
        grid[antx][anty] = 0;
        antd = ((((antd - 1) % 4)+4)%4);
    } else {
        grid[antx][anty] = 1;
        antd = ((((antd + 1) % 4)+4)%4);
    }
    context.fillStyle="hsla(0, 0%, " + (100 - (100*grid[antx][anty])) + "%, 1)";
    context.fillRect( antx * pSize, anty * pSize, pSize, pSize );
    // 0N 1E 2S 3W
    var newy = anty + ((antd - 1) % 2);
    if ( newy < height && newy >= 0)
    {
        anty = newy;
    }
    else
    {
        toggleStart();
    }
    var newx = antx - ((antd - 2) % 2);
    if (newx < width && newx >= 0)
    {
        antx = newx;;
    }
    else
    {
        toggleStart();
    }
    context.fillStyle="rgba(255,0,0,255)";
    context.beginPath();
    context.arc(antx*pSize + pSize/2,anty*pSize + pSize/2,pSize/2,0,2*Math.PI);
    context.fill();
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

function restart() {
    if (playing == true)
    {
        toggleStart();
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0;
        }
    }
    antx = Math.round((width + 1) /2);
    anty = Math.round((height + 1) /2);
    antd = 3;
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
    context.fillStyle="rgba(255,0,0,255)";
    context.beginPath();
    context.arc(antx*pSize + pSize/2,anty*pSize + pSize/2,pSize/2,0,2*Math.PI);
    context.fill();
}