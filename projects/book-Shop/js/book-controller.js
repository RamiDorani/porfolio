'use strict';

const UP_AROOW = '⬆️';
const DOWN_ARROW = '⬇️';
var gBook;
var gPages;

function onInit() {
    _createBooks();
    renderBooks();
    renderPagesCount();

}

function renderBooks() {
    var books = getBooks();
    var strHTMLs = books.map(function (book) {
        return ` 
            <td>${book.id}</td>
             <td>${book.name}</td>
             <td>${book.price}$</td>
             <td>
                 <button onclick="onReadBook('${book.id}')">Read</button>
                 <button onclick="onUpdateBook('${book.id}')">Update Price</button>
                 <button onclick="onDeleteBook('${book.id}')">Delete</button>
             </td>
        </tr>
        `
    });
    document.querySelector('.table-body').innerHTML = strHTMLs.join('');
}


function renderPagesCount() {
    var pages=getPages();
    var strHTMLs=pages.map(function (page) {
        return `
            <span class="page page${page}" onclick="onNextPage('${page}')">${page}</span>
        `
    });
    gPages=pages;
    document.querySelector('.pages').innerHTML=strHTMLs.join('');
    var elPage=document.querySelector(`.page1`);
    elPage.style.textDecoration='underline';
}



function onSortByName() {
    var elArrow1 = document.querySelector('.arrow1');
    var elArrow2 = document.querySelector('.arrow2');
    if(elArrow2.innerHTML) elArrow2.innerHTML='';
    if (!elArrow1.innerHTML || elArrow1.innerHTML===DOWN_ARROW) {
        elArrow1.innerHTML = UP_AROOW;
        elArrow1.hidden = false;
        sortByNameUp();
    }
    else if(elArrow1.innerHTML===UP_AROOW) {
        elArrow1.innerHTML = DOWN_ARROW;
        sortByNameDown();
    }
    renderBooks();
}


function onSortByPrice() {
    var elArrow2 = document.querySelector('.arrow2');
    var elArrow1 = document.querySelector('.arrow1');
    if(elArrow1.innerHTML) elArrow1.innerHTML='';
    if (!elArrow2.innerHTML || elArrow2.innerHTML===DOWN_ARROW) {
        elArrow2.innerHTML = UP_AROOW;
        elArrow2.hidden = false;
        sortByPriceUp();
    }
    else if(elArrow2.innerHTML===UP_AROOW) {
        elArrow2.innerHTML = DOWN_ARROW;
        sortByPriceDown();
    }
    renderBooks();
}


function OnAddBook() {
    document.querySelector('.add-book').hidden=!document.querySelector('.add-book').hidden;
    var elAddBooks=document.querySelector('.add-books');
    if(elAddBooks.innerHTML==='Create a new book') elAddBooks.innerHTML='CLOSE';
    else elAddBooks.innerHTML='Create a new book'
}




function onUpdateBook(bookId) {
    var val = +prompt('Enter a price :');
    updateBook(bookId, val);
    renderBooks();
}


function onReadBook(bookId) {
    var book = getBookById(bookId);
    gBook = book;
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerHTML = book.name;
    elModal.querySelector('p').innerHTML = book.description;
    elModal.querySelector('h4').innerHTML = book.rate;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}


function OnDecreaseRate() {
    var elModal = document.querySelector('.modal');
    var rate = elModal.querySelector('h4');
    if (rate.innerHTML >= 1) rate.innerHTML--;
    else rate.innerHTML = 0;
    gBook.rate = rate.innerHTML;
    saveToStorage(KEY, gBooks);
}

function onIncreaseRate() {
    var elModal = document.querySelector('.modal');
    var rate = elModal.querySelector('h4');
    if (rate.innerHTML <= 9) rate.innerHTML++;
    else rate.innerHTML = 10;
    gBook.rate = rate.innerHTML;
    saveToStorage(KEY, gBooks);
}


function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
    renderPagesCount();
}

function onNextPage(pageNum) {
    goToPage(pageNum);
    test();
    var elPage=document.querySelector(`.page${pageNum}`);
    elPage.style.textDecoration='underline';
    renderBooks();
}

function test() {
    for(var i=0  ; i<gPages.length  ; i++) {
        var elPage=document.querySelector(`.page${i+1}`);
        if(elPage.style.textDecoration==='underline') elPage.style.textDecoration='none';
    }
}


