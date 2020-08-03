'use strict';

var gQuests = [
    { id: 1, opts: ['Sheldon Cooper', 'Howard Wolowitz'], correctOptIdx: 1 },
    { id: 2, opts: ['Ron Weasley', 'Harry Potter'], correctOptIdx: 2 },
    { id: 3, opts: ['Chandler bing', 'Ross Geller'], correctOptIdx: 1 },
];


var gCurrQuestIdx;


init();



function init() {
    gCurrQuestIdx=0;
    //createQuests();
    play();
}

function renderImg(idx) {
    if(idx<gQuests.length) {
        var strHTML = '';
    strHTML += `<img src=images/${idx + 1}.jpg>`;
    var elPic = document.querySelector('.pics');
    elPic.innerHTML = strHTML;
    } else {
        var elALert=document.querySelector('.alert');
        elALert.innerText='Congratulations! You won!'
        var startBtn='';
        startBtn+=`<button class="startBtn" onclick="start()">Start again</button>`;
        var elBtn=document.querySelector('.startOver');
        elBtn.innerHTML+=startBtn;
    }
}



function renderAns(idx) {
    if(idx<gQuests.length) {
        var strHTML = '';
        for (var i = 0; i < gQuests[idx].opts.length; i++) {
            strHTML += `<button onclick="checkAns(${i + 1})">${gQuests[idx].opts[i]}</button>`;
            strHTML += ' ';
        }
        var elAnswers = document.querySelector('.answers');
        elAnswers.innerHTML = strHTML;
    } 
}



function checkAns(ansIdx) {
    var elALert=document.querySelector('.alert');
    if (gQuests[gCurrQuestIdx].correctOptIdx === ansIdx) {
        if(elALert.innerText) elALert.innerText='';
        gCurrQuestIdx++;
        renderImg(gCurrQuestIdx);
        renderAns(gCurrQuestIdx);
    } else {
        elALert.innerText='Try again...';
    }
}
function start() {
    init();
    var elALert=document.querySelector('.alert');
    var elBtn=document.querySelector('.startOver');
        elALert.innerText='';
        elBtn.innerText='';
    }

    
function play() {
    renderImg(gCurrQuestIdx);
    renderAns(gCurrQuestIdx);
}