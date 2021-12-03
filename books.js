//  initializing the array that holds the Books
let myLibrary = [];

//  the library DOM object
const libraryDOM = document.querySelector(".library");

//  initializing the class of Book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read ? 'have read' : 'not read yet'}`;
    };
}

// function adds all books passed to it into the library.
function addBookToLibrary(...args) {
    for (let book of args) {
        myLibrary.push(book);
    }
}

Book.prototype.drawCard = function () {
    let newCard = document.createElement("div");

    // go through each book element and add it as a paragraph to the card
    const cardTextArray = [`Title: ${this.title}`, `Author: ${this.author}`, `# of pages: ${this.pages}`, `${this.read ? 'have read' : 'not read yet'}`];
    for (let i of cardTextArray) {
        let newLine = document.createElement("p");
        newLine.textContent = i;
        newCard.appendChild(newLine);
    }

    // remove button code
    // create button
    const cardButtonRow = document.createElement('div');
    cardButtonRow.className = "new-book-pane-button";

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeCard(newCard));
    cardButtonRow.appendChild(removeButton);

    // remove button code ends here

    // read status toggle button - toggles the read status for the card and the book
    const NewBookPaneReadToggle = document.createElement("button");
    NewBookPaneReadToggle.textContent = "Change read status";
    NewBookPaneReadToggle.addEventListener("click", () => {
        // change read status in library
        // takes data key
        // accesses myLibrary entry
        // runs toggleReadStatus
        myLibrary[NewBookPaneReadToggle.
            parentElement.
            parentElement.dataset.libraryIndex].toggleReadStatus();
        // change read status text on card
        let card = document.getElementsByClassName("card");
        card[NewBookPaneReadToggle.
            parentElement.
            parentElement.dataset.libraryIndex].children[3].textContent = myLibrary[NewBookPaneReadToggle.
                parentElement.
                parentElement.dataset.libraryIndex].read ? 'have read' : 'not read yet';


    });

    cardButtonRow.appendChild(NewBookPaneReadToggle);
    newCard.appendChild(cardButtonRow);


    newCard.className = "card";
    return newCard;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !(this.read);
}

// find data value libraryIndex in card, delete it.
// go to parent of card, delete card.
// clear screen
// redraw library
const removeCard = function (card) {
    myLibrary.splice(card.dataset.libraryIndex);
    libraryDOM.removeChild(card);
};

// function fills the library DOM object with cards, each one representing a different book in the library
const fillLibrary = function (libraryArray) {
    for (let i in libraryArray) {
        const cardToAdd = libraryArray[i].drawCard();
        cardToAdd.dataset.libraryIndex = i;
        libraryDOM.appendChild(cardToAdd);
    }
};


// function empties library DOM object of cards
const emptyLibrary = function () {
    //
    while (libraryDOM.firstChild) {
        libraryDOM.removeChild(libraryDOM.firstChild);
    }
};

// button that lets user add new books
const newButton = document.querySelector("#new-book");
// newButton creates the newBookPane
newButton.addEventListener('click', () => {
    createNewBookPane();
});

// function creates newBookPane object
const createNewBookPane = function () {

    const newBookPane = document.createElement("div");
    newBookPane.className = "new-book-pane";
    // add title: Add New Book
    const newBookPaneWindowTitle = document.createElement("h2");
    newBookPaneWindowTitle.textContent = "Add New Book"
    newBookPane.appendChild(newBookPaneWindowTitle);

    // add field for title
    const newBookPaneTitleField = document.createElement("div");
    newBookPaneTitleField.className = "new-book-field";
    const newBookPaneTitleFieldLabel = document.createElement("label");
    newBookPaneTitleFieldLabel.setAttribute("for", "titleField");
    newBookPaneTitleFieldLabel.textContent = "Title: ";
    const newBookPaneTitleFieldTextbox = document.createElement("input");
    newBookPaneTitleFieldTextbox.setAttribute("id", "titleField");
    newBookPaneTitleFieldTextbox.setAttribute("type", "text");

    newBookPaneTitleField.appendChild(newBookPaneTitleFieldLabel);
    newBookPaneTitleField.appendChild(newBookPaneTitleFieldTextbox);
    newBookPane.appendChild(newBookPaneTitleField);



    // add field for author
    const newBookPaneAuthorField = document.createElement("div");
    newBookPaneAuthorField.className = "new-book-field";
    const newBookPaneAuthorFieldLabel = document.createElement("label");
    newBookPaneAuthorFieldLabel.setAttribute("for", "authorField");
    newBookPaneAuthorFieldLabel.textContent = "Author: ";
    const newBookPaneAuthorFieldTextbox = document.createElement("input");
    newBookPaneAuthorFieldTextbox.setAttribute("id", "authorField");
    newBookPaneAuthorFieldTextbox.setAttribute("type", "text");

    newBookPaneAuthorField.appendChild(newBookPaneAuthorFieldLabel);
    newBookPaneAuthorField.appendChild(newBookPaneAuthorFieldTextbox);
    newBookPane.appendChild(newBookPaneAuthorField);


    // add field for page count
    const newBookPanePageCountField = document.createElement("div");
    newBookPanePageCountField.className = "new-book-field";
    const newBookPanePageCountFieldLabel = document.createElement("label");
    newBookPanePageCountFieldLabel.setAttribute("for", "pageCountField");
    newBookPanePageCountFieldLabel.textContent = "Page Count: ";
    const newBookPanePageCountFieldTextbox = document.createElement("input");
    newBookPanePageCountFieldTextbox.setAttribute("id", "pageCountField");
    newBookPanePageCountFieldTextbox.setAttribute("type", "text");

    newBookPanePageCountField.appendChild(newBookPanePageCountFieldLabel);
    newBookPanePageCountField.appendChild(newBookPanePageCountFieldTextbox);
    newBookPane.appendChild(newBookPanePageCountField);


    // add checkbox for read yet
    const newBookPaneReadYetField = document.createElement("div");
    newBookPaneReadYetField.className = "new-book-field";
    const newBookPaneReadYetFieldLabel = document.createElement("label");
    newBookPaneReadYetFieldLabel.setAttribute("for", "readYetField");
    newBookPaneReadYetFieldLabel.textContent = "Read yet?";
    const newBookPaneReadYetFieldTextbox = document.createElement("input");
    newBookPaneReadYetFieldTextbox.setAttribute("id", "readYetField");
    newBookPaneReadYetFieldTextbox.setAttribute("type", "checkbox");

    newBookPaneReadYetField.appendChild(newBookPaneReadYetFieldLabel);
    newBookPaneReadYetField.appendChild(newBookPaneReadYetFieldTextbox);
    newBookPane.appendChild(newBookPaneReadYetField);

    // below that is a row of two buttons - add book and cancel
    // button row
    const newBookPaneButtonRow = document.createElement("div");
    newBookPaneButtonRow.className = "new-book-pane-button-row";
    // each button
    const newBookPaneAddButton = document.createElement("button");

    newBookPaneAddButton.textContent = "Add Book";
    newBookPaneAddButton.addEventListener("click", () => {
        // create a new object using the contents of the fields. NEW FUNCTION
        newBook = new Book(
            document.getElementById('titleField').value,
            document.getElementById('authorField').value,
            Number(document.getElementById('pageCountField').value),
            document.getElementById('readYetField').checked);
        // add that book to library
        addBookToLibrary(newBook);

        // clear the DOM
        emptyLibrary();

        // redisplay the library
        fillLibrary(myLibrary);
    })

    // cancel button -- removes newBookPane from libraryDOM when clicked
    const newBookPaneCancelButton = document.createElement("button");
    newBookPaneCancelButton.textContent = "Cancel";
    newBookPaneCancelButton.addEventListener("click", () => {
        libraryDOM.removeChild(newBookPane);
    })

    newBookPaneButtonRow.appendChild(newBookPaneAddButton);
    newBookPaneButtonRow.appendChild(newBookPaneCancelButton);
    newBookPane.appendChild(newBookPaneButtonRow);

    // finally append the pane to the DOM
    libraryDOM.appendChild(newBookPane)
};





// following code sets up the testing environment






// initializes some books
const the_stand = new Book(
    "The Stand",
    "Stephen King",
    1348,
    true);

const la_confidential = new Book(
    "LA Confidential",
    "James Ellroy",
    510,
    true
);

const rigoberta = new Book(
    "I, Rigoberta Menchu",
    "Rigoberta Menchu",
    322,
    false
);

addBookToLibrary(the_stand, la_confidential, rigoberta);
fillLibrary(myLibrary);