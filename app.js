class Book {
    constructor(title, author, pages = 0, isRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if(!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !==  title);
    }

    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    }
}

const library = new Library();

const addBookBtn = document.getElementById('addBookBtn');
const bookGrid = document.getElementById('bookGrid');
const addBookModal = document.getElementById('addBookModal');
const bookDetails = document.getElementById('bookDetails');

const openAddBookModal = () => {
    bookDetails.reset();
    addBookModal.classList.add('active');
}

const closeModal = () => {
    addBookModal.classList.remove('active');
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const isReadBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-Card');
    isReadBtn.classList.add('btn');
    removeBtn.classList.add('btn');
    isReadBtn.onclick = toggleRead;
    removeBtn.onclick = removeBook;

    title.textContent = book.title;
    author.textContent = 'by ' + book.author;
    pages.textContent = book.pages + ' pages';
    removeBtn.textContent = 'Remove';

    if(book.isRead) {
        isReadBtn.classList.add('readColor');
        isReadBtn.textContent = 'Read';
    } else {
        isReadBtn.classList.add('notReadColor');
        isReadBtn.textContent = 'Not read yet'; 
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(isReadBtn);
    bookCard.appendChild(removeBtn);
    bookGrid.appendChild(bookCard);
}

const getBookDetails = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    return newBook;
}

const addBook = (e) => {
    e.preventDefault();
    
    const newBook = getBookDetails();

    library.addBook(newBook);
    updateBookGrid();

    closeModal();
}

const removeBook = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '');

    library.removeBook(title);
    updateBookGrid();
}

const toggleRead = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '');

    const book = library.getBook(title);
    book.isRead = !book.isRead;
    updateBookGrid();
}

const handleKeyboardInput = (e) => {
    if(e.key === 'Escape') {
        addBookModal.classList.remove('active');
    }
}

const updateBookGrid = () => {
    bookGrid.innerHTML = '';
    for (let book of library.books) {
        createBookCard(book);
    }
}

addBookBtn.onclick = openAddBookModal;
bookDetails.onsubmit = addBook;
window.onkeydown = handleKeyboardInput;