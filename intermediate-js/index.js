"use strict";

// selectors
const addButton = document.querySelector(".btnSubmit");
const openDialog = document.getElementById("openDialog");
const closeDialog = document.getElementById("closeDialog");
const dialogOverlay = document.getElementById("dialogOverlay");

//form fields
const bookNameInput = document.querySelector("#name");
const bookAuthorInput = document.querySelector("#author");
const bookPagesInput = document.querySelector("#pages");
const bookReadInput = document.querySelector("#read");

// container for displaying books
const booksContainer = document.querySelector(".books-container");

// opening dialog
openDialog.addEventListener("click", () => {
  dialogOverlay.style.display = "flex";
});

closeDialog.addEventListener("click", () => {
  dialogOverlay.style.display = "none";
});

// books array
const myBooks = [];

// constructor
function CreateBook(name, author, read, pages) {
  if (!new.target) {
    throw new Error('This function can only be called with the "new" keyword');
  }

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.read = read;
  this.pages = pages;
}

// add book to array
function addBookToArray(name, author, read, pages, arr) {
  const newBook = new CreateBook(name, author, read, pages);
  arr.push(newBook);
  return newBook;
}

// render books
function renderBooks(arr) {
  // clear container before re-rendering
  booksContainer.innerHTML = "";

  arr.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    bookCard.innerHTML = `
      <div class='image-container'></div>
      <h4 class="bookName">${book.name}</h4>
      <p class="bookAuthor">Author: ${book.author}</p>
      <p class="bookPages">Pages: ${book.pages}</p>
      <p class="bookRead">Read: ${book.read}</p>
    `;

    booksContainer.appendChild(bookCard);
  });
}

// button logic
function implementButton(e) {
  e.preventDefault();

  const name = bookNameInput.value.trim();
  const author = bookAuthorInput.value.trim();
  const pages = bookPagesInput.value.trim();
  const read = bookReadInput.checked ? "Yes" : "No";

  if (!name || !author || !pages) {
    alert("Please fill in all fields");
    return;
  }

  addBookToArray(name, author, read, pages, myBooks);

  // re-render books
  renderBooks(myBooks);

  // reset form
  bookNameInput.value = "";
  bookAuthorInput.value = "";
  bookPagesInput.value = "";
  bookReadInput.checked = false;

  // close dialog
  dialogOverlay.style.display = "none";
}

addButton.addEventListener("click", implementButton);
