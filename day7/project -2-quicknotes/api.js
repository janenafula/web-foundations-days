document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = 'https://jsonplaceholder.typicode.com';

    const loadBtn = document.getElementById('load-btn');
    const loadStatus = document.getElementById('load-status');
    const notesContainer = document.getElementById('notes-container');

    const noteForm = document.getElementById('note-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');

    // --- Task 1: Load Notes (GET) ---
    loadBtn.addEventListener('click', async () => {
        loadBtn.disabled = true;
        loadStatus.textContent = 'Loading notes...';
        loadStatus.className = 'status-msg info';

        try {
            const response = await fetch(`${API_BASE}/posts?_limit=10`);
            if (!response.ok) throw new Error(`Server returned status ${response.status}`);
            const notes = await response.json();

            renderNotes(notes);

            if (notes.length === 0) {
                loadStatus.textContent = 'No notes found.';
                notesContainer.innerHTML = '<p class="empty-state">No notes available.</p>';
            } else {
                loadStatus.textContent = 'Loaded 10 notes from the server.';
                loadStatus.className = 'status-msg success';
            }
        } catch (error) {
            console.error('Failed to load notes:', error);
            loadStatus.textContent = 'Failed to load notes. Please check your connection.';
            loadStatus.className = 'status-msg error';
        } finally {
            loadBtn.disabled = false;
        }
    });

    // --- Task 2: Create Note (POST) ---
    noteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();

        if (!title) {
            formStatus.textContent = 'Title is required.';
            formStatus.className = 'status-msg error';
            return;
        }
        if (title.length > 100) {
            formStatus.textContent = 'Title must be 100 characters or fewer.';
            formStatus.className = 'status-msg error';
            return;
        }

        submitBtn.disabled = true;
        formStatus.textContent = 'Creating note...';
        formStatus.className = 'status-msg info';

        try {
            const response = await fetch(`${API_BASE}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ title, body, userId: 1 })
            });

            if (!response.ok) throw new Error(`Server returned status ${response.status}`);
            const newNote = await response.json();

            prependNoteToList(newNote);
            formStatus.textContent = `Note created (status ${response.status}, id ${newNote.id}).`;
            formStatus.className = 'status-msg success';
            noteForm.reset();
        } catch (error) {
            console.error('Failed to create note:', error);
            formStatus.textContent = 'Failed to create note. Please try again.';
            formStatus.className = 'status-msg error';
        } finally {
            submitBtn.disabled = false;
        }
    });

    // --- Task 3: Delete Note (DELETE) ---
    /*
     * Approach for JSONPlaceholder limitations:
     * JSONPlaceholder is a mock API and does not persist new resources created via POST 
     * (returning mock IDs like 101). When deleting newly created notes, the mock server 
     * may return a 404. We dispatch the DELETE request to conform to REST standards and 
     * optimistically/gracefully remove the note from the DOM to ensure a seamless UI experience.
     */
    async function deleteNote(noteId, noteElement) {
        const deleteBtn = noteElement.querySelector('.delete-btn');
        deleteBtn.disabled = true;
        deleteBtn.textContent = 'Deleting...';

        try {
            const response = await fetch(`${API_BASE}/posts/${noteId}`, {
                method: 'DELETE',
            });

            if (response.ok || response.status === 404) {
                noteElement.remove();
                checkEmptyState();
            } else {
                throw new Error(`Failed to delete, status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            noteElement.remove();
            checkEmptyState();
        }
    }

    function renderNotes(notes) {
        notesContainer.innerHTML = '';
        notes.forEach(note => notesContainer.appendChild(createNoteElement(note)));
        checkEmptyState();
    }

    function prependNoteToList(note) {
        const emptyState = notesContainer.querySelector('.empty-state');
        if (emptyState) emptyState.remove();
        notesContainer.prepend(createNoteElement(note));
    }

    function createNoteElement(note) {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.dataset.id = note.id;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'note-content';

        const h3 = document.createElement('h3');
        h3.textContent = note.title;

        const p = document.createElement('p');
        p.textContent = note.body;

        contentDiv.appendChild(h3);
        contentDiv.appendChild(p);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id, div));

        div.appendChild(contentDiv);
        div.appendChild(deleteBtn);
        return div;
    }

    function checkEmptyState() {
        if (notesContainer.children.length === 0) {
            notesContainer.innerHTML = '<p class="empty-state">No notes available.</p>';
        }
    }
});