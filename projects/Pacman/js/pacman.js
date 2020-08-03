const PACMAN = '&#9786;';

var gPacman;


function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  if (nextCell === SUPER_FOOD && gPacman.isSuper) return
  // Hitting FOOD? update score
  if (nextCell === FOOD) updateScore(1);
  if (nextCell === CHERRY) updateScore(10);
  if (nextCell === SUPER_FOOD && !gPacman.isSuper) {
    gPacman.isSuper = true;
    updateScore(1);
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        if (gBoard[i][j] === GHOST) {
          var coord = { i: i, j: j };
          renderCell(coord, getGhostHTML());
        }
      }
    }
  }
  if (nextCell === GHOST && gPacman.isSuper === true) {
    renderCell(gPacman.location, EMPTY);
    for (var i = 0; i < gGhosts.length; i++) {
      if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
        gGhosts.splice(i, 1);

        return setTimeout(function() {
          createGhost(gBoard);
          gPacman.isSuper = false;
        }, 5000)

      }
    }
  }

  if (nextCell === GHOST && gPacman.isSuper === false) {
    renderCell(gPacman.location, EMPTY);
    gameOver();
    return;
  }
  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);


  
}


function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}