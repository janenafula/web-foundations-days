document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('load-users');
    const filterInput = document.getElementById('filter-input');
    const statusEl = document.getElementById('status');
    const usersListEl = document.getElementById('users-list');

    let allUsers = [];

    async function fetchUsers() {
        // Disable button and display loading status
        loadButton.disabled = true;
        statusEl.textContent = 'Loading users...';
        usersListEl.innerHTML = '';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            allUsers = await response.json();
            statusEl.textContent = `Successfully loaded ${allUsers.length} users.`;
            renderUsers(allUsers);
        } catch (error) {
            statusEl.textContent = `Error: Failed to fetch users. (${error.message})`;
        } finally {
            loadButton.disabled = false;
        }
    }

    function renderUsers(users) {
        usersListEl.innerHTML = '';

        if (users.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No matching users found.';
            usersListEl.appendChild(li);
            return;
        }

        users.forEach(user => {
            const li = document.createElement('li');

            const nameEl = document.createElement('strong');
            nameEl.textContent = user.name;

            const detailsEl = document.createElement('span');
            detailsEl.textContent = ` — Email: ${user.email} | City: ${user.address.city} | Company: ${user.company.name}`;

            li.appendChild(nameEl);
            li.appendChild(detailsEl);
            usersListEl.appendChild(li);
        });
    }

    // Filter users locally without making a new network request
    filterInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    loadButton.addEventListener('click', fetchUsers);
});