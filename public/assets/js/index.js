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

  const noteActive = () => {
    hide(saveNoteButton);
  
    if (activeNote.id) {
      titleInput.setAttribute('readonly', true);
      noteTextArea.setAttribute('readonly', true);
      titleInput.value = activeNote.title;
      noteTextArea.value = activeNote.text;
    } else {
      titleInput.removeAttribute('readonly');
      noteTextArea.removeAttribute('readonly');
      titleInput.value = '';
      noteTextArea.value = '';
    }
  };
  
  const handleNoteSave = () => {
    const newNote = {
      title: titleInput.value,
      text: noteTextArea.value,
    };
    noteSave(newNote).then(() => {
      getRenderNotes();
      noteActive();
    });
  };
  
  
  // Sets the activeNote and displays it
  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    noteActive();
  };
  
  // Sets the activeNote to and empty object and allows the user to enter a new note
  const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
  };
  
  const handleRenderSaveBtn = () => {
    if (!titleInput.value.trim() || !noteTextArea.value.trim()) {
      hide(saveNoteButton);
    } else {
      show(saveNoteButton);
    }
  };
  
  // Render the list of note titles
  const rendernoteListElements = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
      noteListElements.forEach((el) => (el.innerHTML = ''));
    }
  
    let noteListElementsItems = [];
  
  
    if (jsonNotes.length === 0) {
      noteListElementsItems.push(createLi('No saved Notes', false));
    }
  
    jsonNotes.forEach((note) => {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);
  
      noteListElementsItems.push(li);
    });
  
    if (window.location.pathname === '/notes') {
      noteListElementsItems.forEach((note) => noteListElements[0].append(note));
    }
  };
  
  // Gets notes from the db and renders them to the sidebar
  const getRenderNotes = () => noteGet().then(rendernoteListElements);
  
  if (window.location.pathname === '/notes') {
    saveNoteButton.addEventListener('click', handleNoteSave);
    newNoteButton.addEventListener('click', handleNewNoteView);
    titleInput.addEventListener('keyup', handleRenderSaveBtn);
    noteTextArea.addEventListener('keyup', handleRenderSaveBtn);
  }
  
  
  getRenderNotes();
  
  
// Deletes the clicked note
const handleNoteDelete = (e) => {
  
    e.stopPropagation();
  
    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
  
    if (activeNote.id === noteId) {
      activeNote = {};
    }
  
    noteDelete(noteId).then(() => {
      getRenderNotes();
      noteActive();
    });
  };
  
    // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
  
      const spanEl = document.createElement('span');
      spanEl.classList.add('list-item-title');
      spanEl.innerText = text;
      spanEl.addEventListener('click', handleNoteView);
  
      liEl.append(spanEl);
  
      if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
          'fas',
          'fa-trash-alt',
          'float-right',
          'text-danger',
          'delete-note'
        );
        delBtnEl.addEventListener('click', handleNoteDelete);
  
        liEl.append(delBtnEl);
      }
  
      return liEl;
    };
  
  




