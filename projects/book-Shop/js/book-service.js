'use strict';

const KEY='book';
const KEY2='countPages';
const PAGE_SIZE = 8;
var gBooksName=['Harry Potter','Lord Of The Rings','Peter Pan','A Brief History of Time'];


var gBooks;
var gPageCount;
var gPageIdx = 0;

function getBooks() {
    //return gBooks;
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx,startIdx+PAGE_SIZE);
}

function getPages() {
    var gPageCount = Math.ceil((gBooks.length / PAGE_SIZE));
    var pagesNums=[];
    for(var i=1  ; i<=gPageCount  ; i++) {
        pagesNums.push(i);
    }
    saveToStorage(KEY2,pagesNums);
    return pagesNums;
}

function getBookById(id) {
    var book=gBooks.find(function(book) {
        return book.id===id;
    });
    return book;
}

function getBookIndex(id) {
    var idx=gBooks.findIndex(function(book) {
        return book.id===id;
    });
    return idx;
}



function addBook() {
    var newBookName=document.querySelector('.book-name').value;
    var newBookPrice=document.querySelector('.book-price').value;
    gBooksName.unshift(newBookName);
    var newBook=_createBook(newBookName);
    newBook.price=newBookPrice;
    gBooks.unshift(newBook);
    saveToStorage(KEY,gBooks);
    renderBooks();
    renderPagesCount();
    document.querySelector('.book-name').value='';
    document.querySelector('.book-price').value='';
}

// function addBook() {
//     var newBookName=prompt('Enter book name :');
//     var newBookPrice=+prompt('Enter a price');
//     gBooksName.unshift(newBookName);
//     var newBook=_createBook(newBookName);
//     newBook.price=newBookPrice;
//     gBooks.unshift(newBook);
//     saveToStorage(KEY,gBooks);
// }



function _createBooks() {
    var books=loadFromStorage(KEY);
    if(!books || !books.length) {
        books=[];
        var booksNames=gBooksName;
        for(var i=0  ; i<50  ; i++) {
            var bookName=booksNames[getRandomInt(0,booksNames.length)];
            books.push(_createBook(bookName));
        }
    }
    gBooks=books;
    saveToStorage(KEY,gBooks);
}



function _createBook(bookName) {
    return {    
        id: makeId(),
        name: bookName,
        price: getRandomInt(5,101),
        description: makeLorem(),
        rate: getRandomInt(0,11)
    };
}

function sortByPriceUp() {
    gBooks.sort(function (a,b){
        return a.price-b.price;
 });
}

function sortByPriceDown() {
    gBooks.sort(function (a,b){
        return b.price-a.price;
 });
}

function sortByNameUp() {
    gBooks.sort(function(a,b) {
        var nameA=a.name.toUpperCase();
        var nameB=b.name.toUpperCase();
        if(nameA < nameB) return -1;
        if(nameA > nameB) return 1;
        else return 0;
    });
}

function sortByNameDown() {
    gBooks.sort(function(a,b) {
        var nameA=a.name.toUpperCase();
        var nameB=b.name.toUpperCase();
        if(nameA > nameB) return -1;
        if(nameA < nameB) return 1;
        else return 0;
    });
}





function updateBook(id,value) {
    var book=getBookById(id);
    book.price=value;
    saveToStorage(KEY,gBooks);
}


function deleteBook(id) {
    var bookIdx=getBookIndex(id);
    gBooks.splice(bookIdx,1);
    saveToStorage(KEY,gBooks);
}

function goToPage(pageNum) {
   
    gPageIdx=pageNum-1;

}

