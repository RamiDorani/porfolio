function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine === true) neighborsSum++;
        }
    }
    return neighborsSum;
}

function stopWatch() {
    var timerHTML = document.querySelector('.timer');
    gSeconds++
    if (gMinutes) {
        if (gMinutes > 9) timerHTML.innerHTML = gMinutes;
        else {
            timerHTML.innerHTML = '0' + gMinutes;
        }
    } else {
        timerHTML.innerHTML = '00'
    }
    if (gSeconds > 9) {
        timerHTML.innerHTML += ':' + gSeconds;
    } else {
        timerHTML.innerHTML += '0' + gSeconds;
    }
    if (gSeconds >= 99) {
        gSeconds = 0;
        gMinutes++;
    }
}
