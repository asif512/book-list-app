//======= ES6 SYNTAX =======//

class Book {
  constructor(title, author, code) {
    this.title = title;
    this.author = author;
    this.code = code;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.code}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(tr);
  }

  showMessage(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const card = document.querySelector('.card');
    const form = document.querySelector('#book-form');
    card.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // Delete Book
  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  // Field Value Clear
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('code').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // Display Books from LS
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;
      ui.addBookToList(book);
    });
  }

  // Add Books to LS
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Remove Books From LS
  static removeBook(code) {
    const books = Store.getBooks();
    books.forEach(function(book, index){
     if(book.code === code) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        code = document.getElementById('code').value

  // Instantiate book
  const book = new Book(title, author, code);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || code === '') {
    ui.showMessage('Please fill in all fields', 'alert-danger');
  } else {
    // Add book to list
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showMessage('Book Added!', 'alert-success');
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove Book from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showMessage('Book Removed!', 'alert-success');
  e.preventDefault();
});