'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🍔'
const CHERRY = '🍒';

var gCherryCount=0;
var gCherryInterval;
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

var gFirstFoodCount = 1;

function init() {
  clearInterval(gCherryInterval);
  gBoard = buildBoard();
  gFirstFoodCount = 1;
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = '';
  document.querySelector('header h2').innerText = '';
  document.querySelector('.resetBtn').style.display = 'none';
  createPacman(gBoard);
  createGhosts(gBoard);
  countFood(gBoard);
  gGame.isOn = true;
  gCherryInterval = setInterval(function () {
    placeCherry(gBoard);
  }, 5000);

  printMat(gBoard, '.board-container');
  //placeCherry(gBoard);
  // console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === 1 && j === 8 || i === 8 && j === 1 || i === 8 && j == 8) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }
  console.log(gFirstFoodCount);
  return board;
}

function countFood(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === FOOD || board[i][j] === SUPER_FOOD) gFirstFoodCount++;
    }
  }
  console.log(gFirstFoodCount);
}





function reset() {
  init();
}

function placeCherry(board) {
  var emptySpots=[];
  for(var i=0  ; i<board.length  ; i++) {
    for(var j=0  ; j<board[i].length  ; j++){
      if(board[i][j]===EMPTY) {
        var coord={i:i, j:j};
        emptySpots.push(coord);
      }
    }
  }
  //console.log(emptySpots);
  var randomNum=getRandomIntInclusive(0,emptySpots.length-1);
  var spots=emptySpots[randomNum];
  //console.log('this is test',test);
  //console.log(randomNum);
  renderCell(spots,CHERRY)

}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  if (gGame.score === gFirstFoodCount) {
    //document.querySelector('header h3 span').innerText = 'victor';
    gameOver();
  }
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver() {
  if (gGame.score === gFirstFoodCount) {
    document.querySelector('header h2').innerText = 'YOU WON!';
  }
  document.querySelector('header h3 span').innerText = 'GAME OVER';
  document.querySelector('.resetBtn').style.display = 'block';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  gCherryInterval=null;
}




