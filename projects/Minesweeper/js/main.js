'use strict';

const MINE = '💣';
const FLAG = '🚩';
const HINT = '💡';
const NO_HINT = '✖️'
const NORMAL = '😀';
const LOSE = '🤯';
const WIN = '😎';


var gOption = 0;
var gMine;
var gBoard;
var gSeconds = 0;
var gMinutes = 0;
var gClickCount = 0;
var gInterval = null;
var gMarkCount = 0;
var gShowCount = 0;
var gHitInterval = null;
var gHintFlag = false
var gElEmoji = document.querySelector('.emoji');
var gElHints = document.querySelectorAll('.hints');
var elAlert = document.querySelector('.alert');
var elMines = document.querySelector('.mines');
var elBtn = document.querySelector('.resetBtn');
var sound;
var gHintCount = 0;



function start(option) {
    if (option === 1) {
        gOption = 4
        gMine = 2;
    } else if (option === 2) {
        gOption = 8
        gMine = 12;
    } else if (option === 3) {
        gOption = 12
        gMine = 30;
    }
    elMines.innerHTML = gMine + MINE;
    gBoard = createBoard(gOption, gMine);
    renderBoard(gBoard);
    var elHints = document.querySelectorAll('.hints');
    for (var i = 0; i < elHints.length; i++) {
        elHints[i].innerHTML = HINT;
    }
    gElEmoji.innerHTML = NORMAL;
}

var elBoard = document.querySelector('.board')
elBoard.oncontextmenu = function () {
    return false;
}


function createBoard(value) {
    var board = [];

    for (var i = 0; i < value; i++) {
        board[i] = [];
        for (var j = 0; j < value; j++) {
            var cell = {
                id: { i: i, j: j },
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isHint: false
            };
            board[i][j] = cell;
        }
    }

    //placing mines in random places.
    var count = gMine;
    for (var i = 0; i < count; i++) {
        var num1 = getRandomInt(0, gOption);
        var num2 = getRandomInt(1, gOption);
        if (board[num1][num2].isMine) {
            count++;
            continue;
        } else board[num1][num2].isMine = true;
    }

    //counting neighbors
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var countNegs = countNeighbors(i, j, board);
            board[i][j].minesAroundCount = countNegs;
        }
    }
    console.log(board);
    return board;
}


function renderBoard(board) {
    var strHTML = ``;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            var cellClass = '';
            if (cell.isMine) cellClass += ' mine';
            if (!cell.isMine) cellClass += ' not-mine';
            strHTML += `<td class="cell cell-${i}-${j}  cell${cellClass}-${i}-${j} ${cellClass}" onclick=cellClicked(${i},${j}) oncontextmenu="setFlag(${i},${j})"></td>`;
        }
        strHTML += `</tr>`;
    }
    document.querySelector('.board').innerHTML = strHTML;
    console.log(board);
}



function cellClicked(i, j) {
    gClickCount++;
    var cell = gBoard[i][j];
    if (cell.isShown || cell.isMarked) return;
    else if (cell.isMine && gClickCount > 1) {
        if (gHintFlag) {
            showHint(i, j);
        } else {
            cell.isShown = true;
            var elCel = document.querySelector(`.mine-${i}-${j}`);
            elCel.innerText = MINE
            gameOver();
        }
    } else if (cell.isMine && gClickCount === 1) {
        cell.isMine = false;
        gBoard[0][0].isMine = true;
        reduceMinesCount(i, j);
        increaseMinesCount();
        renderBoard(gBoard);
        console.log(gBoard);
        gInterval = setInterval(stopWatch, 10);
        var elCel = document.querySelector(`.not-mine-${i}-${j}`);
        if (cell.minesAroundCount === 0) elCel.innerHTML = '';
        else elCel.innerHTML = cell.minesAroundCount;
        changeFontColor(elCel, cell.minesAroundCount);
        elCel.style.backgroundColor = 'lightgray';
    } else {
        if (gHintFlag) {
            showHint(i, j);
        } else {
            cell.isShown = true;
            var elCel = document.querySelector(`.not-mine-${i}-${j}`);
            if (cell.minesAroundCount === 0) elCel.innerHTML = '';
            else elCel.innerHTML = cell.minesAroundCount;
            changeFontColor(elCel, cell.minesAroundCount);
            elCel.style.backgroundColor = 'lightgray';
            checkGameOver(i, j);
            if (cell.minesAroundCount === 0) reveal(i, j);
            if (gClickCount > 1) return
            else {
                gInterval = setInterval(stopWatch, 10);
            }
        }
    }
    checkGameOver(i, j);
}


function reduceMinesCount(I, J) {
    for (var i = I - 1; i <= I + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        if (i === I || j === J) continue;
        for (var j = J - 1; j <= J + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            gBoard[i][j].minesAroundCount--;
        }
    }
}

function increaseMinesCount() {
    gBoard[0][1].minesAroundCount++;
    gBoard[1][0].minesAroundCount++;
    gBoard[1][1].minesAroundCount++;
}

function setFlag(i, j) {
    var cell = gBoard[i][j];
    var elCel = document.querySelector(`.cell-${i}-${j}`);
    if (cell.isShown) return;
    else if (!cell.isMarked) {
        cell.isMarked = true;
        elCel.innerText = FLAG;
        checkGameOver(i, j);
    } else if (cell.isMarked) {
        cell.isMarked = false;
        elCel.innerText = '';
    }

}


function hint(value) {
    gHintCount++;
    if (gElHints[value].innerHTML === NO_HINT) return
    if (!gHintFlag) {
        gHintFlag = true;
        gElHints[value].innerHTML = NO_HINT;
        gElHints[value].style.backgroundColor = 'black';
        gElHints[value].style.cursor = 'context-menu';
        if (!gInterval && gHintCount === 1) gInterval = setInterval(stopWatch, 10);
    }
}

function showHint(i, j) {
    revealHint(i, j);
    gHitInterval = setTimeout(function () {
        close(i, j);
    }, 1000);
    gHintFlag = false
}


function revealHint(I, J) {
    for (var i = I - 1; i <= I + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = J - 1; j <= J + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (!gBoard[i][j].isShown) {
                if (!gBoard[i][j].isMine) {
                    var elCel = document.querySelector(`.cell-${i}-${j}`);
                    elCel.style.backgroundColor = 'lightgray';
                    if (gBoard[i][j].minesAroundCount === 0) elCel.innerHTML = '';
                    else elCel.innerHTML = gBoard[i][j].minesAroundCount;
                    changeFontColor(elCel, gBoard[i][j].minesAroundCount);
                    gBoard[i][j].isShown = true;
                    gBoard[i][j].isHint = true;

                } else if (gBoard[i][j].isMine) {
                    var elCel = document.querySelector(`.cell-${i}-${j}`);
                    elCel.style.backgroundColor = 'lightgray';
                    elCel.innerHTML = MINE;
                    gBoard[i][j].isShown = true;
                    gBoard[i][j].isHint = true;
                }
            }
        }
    }
}



function close(I, J) {
    for (var i = I - 1; i <= I + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = J - 1; j <= J + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown && gBoard[i][j].isHint) {
                var elCel = document.querySelector(`.cell-${i}-${j}`);
                if (gBoard[i][j].isMarked) {
                    elCel.style.backgroundColor = 'white';
                    elCel.innerHTML = FLAG;
                    gBoard[i][j].isShown = false;
                    gBoard[i][j].isHint = false;
                } else {
                    elCel.style.backgroundColor = 'white';
                    elCel.innerHTML = '';
                    gBoard[i][j].isShown = false;
                    gBoard[i][j].isHint = false;
                }
            }
        }
    }
}





function reveal(I, J) {
    for (var i = I - 1; i <= I + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = J - 1; j <= J + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                var elCel = document.querySelector(`.cell-${i}-${j}`);
                elCel.style.backgroundColor = 'lightgray';
                if (gBoard[i][j].minesAroundCount === 0) elCel.innerHTML = '';
                else elCel.innerHTML = gBoard[i][j].minesAroundCount;
                changeFontColor(elCel, gBoard[i][j].minesAroundCount);
                gBoard[i][j].isShown = true;
            }
        }
    }
    checkGameOver(I, J);
}




function gameOver() {
    elAlert.innerText = 'Game Over';
    elAlert.style.display = 'inline'
    elAlert.style.backgroundColor = 'red';
    sound = new Audio('../sounds/Bomb.mp3');
    sound.play();
    clearInterval(gInterval);
    clearTimeout(gHitInterval);
    var elMines = document.querySelectorAll('.mine');
    for (var i = 0; i < elMines.length; i++) {
        elMines[i].innerHTML = MINE;
    }
    gElEmoji.innerHTML = LOSE;
    elBtn.style.display = 'inline';
}




function checkGameOver(i, j) {
    var cell = gBoard[i][j];

    var showCount = (gOption ** 2) - gMine;
    var currShowCount = getAllShow();

    var markCount = gMine;
    var currMarkCount = getAllMarked();
    if (currShowCount === showCount && markCount === currMarkCount) {
        clearInterval(gInterval);
        elAlert.innerText = 'YOU WON!';
        elAlert.style.display = 'inline'
        sound = new Audio('../sounds/cheers.mp3');
        sound.play();
        elAlert.style.backgroundColor = 'lightGreen';
        gElEmoji.innerHTML = WIN;
        elBtn.style.display = 'inline';
    }
}

function getAllMarked() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMarked && gBoard[i][j].isMine) count++;
        }
    }
    return count;
}

function getAllShow() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown) count++;
        }
    }
    return count;
}



function reset() {
    gMarkCount = 0;
    gShowCount = 0;
    gMinutes = 0;
    gSeconds = 0;
    gClickCount = 0;
    gHintCount = 0;
    gHintFlag = false;
    sound.pause();
    gInterval = null;
    gHitInterval = null;

    gElEmoji.innerHTML = NORMAL;
    document.querySelector('.timer').innerHTML = '';
    elAlert.style.display = 'none'

    for (var i = 0; i < gElHints.length; i++) {
        gElHints[i].innerHTML = HINT;
        gElHints[i].style.backgroundColor = '';
        gElHints[i].style.cursor = 'pointer';
    }
    if (gOption === 4) {
        gBoard = createBoard(gOption, gMine);
    } else if (gOption === 8) {
        gBoard = createBoard(gOption, gMine);
    } else if (gOption === 12) {
        gBoard = createBoard(gOption, gMine);
    }
    elBtn.style.display = 'none';
    renderBoard(gBoard);
}



function changeFontColor(elm, value) {
    //console.log(value);
    switch (value) {
        case 1:
            elm.style.color = 'blue';
            break;
        case 2:
            elm.style.color = 'green';
            break;
        case 3:
            elm.style.color = 'red';
            break;
        case 4:
            elm.style.color = 'brown';
            break;
        case 5:
            elm.style.color = 'purple';
            break;
        case 6:
            elm.style.color = 'yellow';
            break;
        case 7:
            elm.style.color = ' ';
            break;
        case 8:
            elm.style.color = 'gold';
            break;

    }
}