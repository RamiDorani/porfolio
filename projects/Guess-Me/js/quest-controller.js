'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide();
    // TODO: show the quest section
    $('.quest').show();
    renderQuest();
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    var currQuest=getCurrQuest();
    console.log(currQuest);
    $('.quest-h2').text(currQuest.txt);
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            gLastRes=res;
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            gLastRes=res;
            alert('I dont know...teach me!')
            // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes=res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    var newAns=$('.new-answer').val();
    var newQuest=$('.new-question').val();
    addGuess(newQuest,newAns,gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    $('.new-answer').val('');
    $('.new-question').val('');
    init();

}

