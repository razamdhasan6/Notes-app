const btnEl = document.querySelector('button.page');
const pageContainerEle = document.querySelector('.page-container');

// Create a new note element
const createNoteElement = (content = "New page created") => {
    const newPage = document.createElement('div');
    newPage.classList.add('page');

    const pageContent = document.createElement('p');
    pageContent.setAttribute('contenteditable', 'true');
    pageContent.textContent = content;
    newPage.appendChild(pageContent);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    newPage.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        newPage.remove();
        saveNotes(); // Save notes to local storage after deletion
    });

    pageContent.addEventListener('input', () => {
        saveNotes(); // Save notes to local storage on content change
    });

    pageContainerEle.appendChild(newPage); // Always append at the end
    saveNotes(); // Save notes to local storage after adding a new note
};

// Function to save all notes to local storage
const saveNotes = () => {
    const notes = [];
    document.querySelectorAll('.page').forEach(page => {
        const pageContent = page.querySelector('p');

        // Defensive check to ensure pageContent is not null
        if (pageContent) {
            const content = pageContent.textContent;
            notes.push({ content });
        }
    });
    localStorage.setItem('notes', JSON.stringify(notes)); // Save notes to local storage
};

// Function to load all notes from local storage
const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    notes.forEach(note => {
        createNoteElement(note.content); // Load notes in the same order they are stored
    });
};

// Event listener for the "Create Notes" button
btnEl.addEventListener('click', () => {
    createNoteElement(); // Create a new note when the button is clicked
});

// Load the notes when the page is loaded
document.addEventListener('DOMContentLoaded', loadNotes);
