'use strict';

var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gInterval;
var gCount;

function initGame() {
    gInterval;
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    // gInterval = setInterval(placeBall, 1000, gBoard);
    gInterval = setInterval(function () {
        placeBall(gBoard)
    }, 1000);
    gCount = 0;
}


function buildBoard() {
    // Create the Matrix
    // var board = createMat(10, 12)
    var board = new Array(11);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(13);
    }

    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }

            if (i === 0 && j === 6) {
                cell.type = FLOOR;
            }
            if (i === 5 && j === 0) {
                cell.type = FLOOR;
            }
            if (i === board.length - 1 && j === 6) {
                cell.type = FLOOR;
            }
            if (i === 5 && j === board[0].length - 1) {
                cell.type = FLOOR;
            }

            // Add created cell to The game board
            board[i][j] = cell;
        }
    }

    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[7][4].gameElement = BALL;

    console.log(board);
    return board;
}



// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement
            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            //TODO - Change To ES6 template string
            strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

            // TODO - change to switch case statement
            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    console.log('strHTML is:');
    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


// Move the player to a specific location
function moveTo(i, j) {
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;

    if (i === 0 && j === 6) {
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        renderCell(gGamerPos, '');
        gGamerPos.i = gBoard.length - 1;
        gGamerPos.j = 6;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        renderCell(gGamerPos, GAMER_IMG);
    }

    if (i === 5 && j === 0) {
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        renderCell(gGamerPos, '');
        gGamerPos.i = 5;
        gGamerPos.j = gBoard[i].length - 1;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        renderCell(gGamerPos, GAMER_IMG);
    }

    if (i === gBoard.length - 1 && j === 6) {
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        renderCell(gGamerPos, '');
        gGamerPos.i = 0;
        gGamerPos.j = 6;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        renderCell(gGamerPos, GAMER_IMG);
    }

    if (i === 5 && j === gBoard[i].length - 1) {
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        renderCell(gGamerPos, '');
        gGamerPos.i = 5;
        gGamerPos.j = 0;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        renderCell(gGamerPos, GAMER_IMG);
    }

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

        if (targetCell.gameElement === BALL) {
            ballsCount();
        }

        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        renderCell(gGamerPos, GAMER_IMG);

    } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;

    }

}



// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}


function placeBall(board) {
    var emptyCells = [];
    var points;
    var location;
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[i].length - 1; j++) {
            var currCel = board[i][j];
            if (!currCel.gameElement) {
                points = { i: i, j: j };
                emptyCells.push(points);
            }
        }
    }
    //console.log(emptyCells);
    location = emptyCells[getRandomInt(0, emptyCells.length)];
    board[location.i][location.j].gameElement = BALL;
    renderCell(location, BALL_IMG);
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}



function ballsCount() {
    gCount++;
    var elCount = document.querySelector('.ball-collecting');
    elCount.innerHTML = 'balls collected: ' + gCount;
    console.log(gCount);
}