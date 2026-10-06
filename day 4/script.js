// Element Selection
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

// State Storage
let notes = [];

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  render();
});

// Load notes from localStorage
function loadNotes() {
  const savedNotes = localStorage.getItem('quicknotes_data');
  if (savedNotes) {
    try {
      notes = JSON.parse(savedNotes);
    } catch (e) {
      notes = [];
    }
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('quicknotes_data', JSON.stringify(notes));
}

// Update Note Count Text
function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = '0 notes';
  } else if (count === 1) {
    noteCount.textContent = '1 note';
  } else {
    noteCount.textContent = `${count} notes`;
  }
}

// Render Notes List
function render() {
  notesList.textContent = '';
  const query = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(note => 
    note.text.toLowerCase().includes(query)
  );

  filteredNotes.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'note-content';

    const textPara = document.createElement('p');
    textPara.textContent = note.text;

    const metaPara = document.createElement('p');
    metaPara.className = 'note-meta';
    metaPara.textContent = `Category: ${note.category} | Created: ${note.createdAt}`;

    contentDiv.appendChild(textPara);
    contentDiv.appendChild(metaPara);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });

  updateCount(filteredNotes.length);
}

// Add Note Event Listener
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation
  if (text.length === 0) {
    errorMessage.textContent = 'Note content cannot be empty.';
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Note content must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleDateString()
  };

  notes.unshift(newNote);
  saveNotes();
  render();

  noteInput.value = '';
});

// Delete Note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render();
}

// Search Filter Listener
searchInput.addEventListener('input', () => {
  render();
});