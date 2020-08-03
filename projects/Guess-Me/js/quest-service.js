'use strict';
const KEY = 'qestions'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree= loadFromStorage(KEY);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage(KEY, gQuestsTree);
}


function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}


function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[lastRes]=createQuest(newQuestTxt);
    gPrevQuest[lastRes].yes=createQuest(newGuessTxt);
    gPrevQuest[lastRes].no=gCurrQuest;
    saveToStorage(KEY,gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}


