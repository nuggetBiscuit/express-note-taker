let titleInput;
let noteTextArea;
let saveNoteButton;
let newNoteButton;
let noteListElements;


if (window.location.pathname === '/notes') {
  titleInput = document.querySelector('.note-title');
  noteTextArea = document.querySelector('.note-textarea');
  saveNoteButton = document.querySelector('.save-note');
  newNoteButton = document.querySelector('.new-note');
  noteListElements = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const noteGet = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const noteSave = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const noteDelete = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });




