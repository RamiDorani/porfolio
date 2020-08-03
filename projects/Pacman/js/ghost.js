



const GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
    //console.log(gGhosts);
}



function moveGhosts() {
    
    for (var idx = 0; idx < gGhosts.length; idx++) {
        var ghost = gGhosts[idx];
        var moveDiff = getMoveDiff();
        var targetLoc = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        var targetCell = gBoard[targetLoc.i][targetLoc.j];
        if (targetCell === WALL) continue;
        if (targetCell === GHOST) continue;
        if (targetCell === PACMAN) {
            gameOver('Game over');
        }
        
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        gBoard[targetLoc.i][targetLoc.j] = GHOST;
        
        
        renderCell(targetLoc, getGhostHTML());
        renderCell(ghost.location, ghost.currCellContent);

        ghost.location = targetLoc;
        ghost.currCellContent = targetCell;
        // if (targetCell === FOOD) {
        //     ghost.currCellContent = FOOD;
        // } else {
        //     ghost.currCellContent = '';
        // }
    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`
}






