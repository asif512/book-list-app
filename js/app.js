//==== ES5 SYNTAX ====//

// Book Constructor
function Book(title, author, code) {
  this.title = title;
  this.author = author;
  this.code = code;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const tr = document.createElement('tr');
  // Insert cols
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.code}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(tr);
}

// Show Alert
UI.prototype.showMessage = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const card = document.querySelector('.card');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  card.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('code').value = '';
}

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
      alert(123)
    // Error alert
    ui.showMessage('Please fill in all fields', 'alert-danger');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showMessage('Book Added!', 'alert-success');
  
    // Clear fields
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

  // Show message
  ui.showMessage('Book Removed!', 'alert-success');

  e.preventDefault();
});