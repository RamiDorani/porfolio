'use strict';

var gNums1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var gNums2= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var gNums3= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26,27,28,29,30,31,32,33,34,35,36];
var gNums;
var gCount = 1;
var gInterval;
var gSeconds = 0;
var gMinutes = 0;
var gOption;




function start (option) {
    if(option===1){
        gOption=option
     createBoard(gNums1);
    } 
    if(option===2) {
        gOption=option
     createBoard(gNums2);
    }
        
    if(option===3) {
        gOption=option
        createBoard(gNums3);   
    }
}

function createBoard(board) {
    var strHTML = '';
    var copyArr = board.slice();
    var count = 1;
    for (var i = 0; i < Math.sqrt(board.length); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(board.length); j++) {
            var idx = getRandomInt(1, copyArr.length + 1)
            //console.log(idx);
            var currCel = copyArr[idx - 1];
            strHTML += `<td class=cell onclick=" cellClicked(this,${currCel})">${currCel}</td>`
            ++count;
            copyArr.splice(idx - 1, 1);
        }
        strHTML += '</tr>';
    }
    var elTable=document.querySelector('table');
    elTable.style.display='show'; 
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function  cellClicked(cel, num) {
    if (num === gCount) {
        cel.style.backgroundColor = 'red';
        gCount++;
    }
    if (num === 1) {
        gInterval = setInterval(stopWatch, 10)
        var Elbtn = document.querySelector('.resetGame');
        Elbtn.style.display='block';
    }
    if (gOption===1 && num === 16) {
        clearInterval(gInterval);
    }

    if (gOption===2 && num === 25) {
        clearInterval(gInterval);
    }

    if (gOption===3 && num === 36) {
        clearInterval(gInterval);
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function stopWatch() {
    var timerHTML = document.querySelector('.timer-display');
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

function reset() {
    if(gOption===1) createBoard(gNums1);
    if(gOption===2) createBoard(gNums2);
    if(gOption===3) createBoard(gNums3);
    gMinutes = 0;
    gSeconds = 0;
    gCount=1;
    clearInterval(gInterval)
    var timerHTML = document.querySelector('.timer-display');
    timerHTML.innerHTML = '';
}

