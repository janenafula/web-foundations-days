const noteText = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');

// 1. Load saved draft and theme preference from localStorage on startup
const savedText = localStorage.getItem('noteDraft');
if (savedText !== null) {
    noteText.value = savedText;
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
}

// 2. Core function to calculate counts, handle thresholds, and save draft
function updateCounts() {
    const text = noteText.value;
    const currentLength = text.length;

    // Update Character Count
    charCount.textContent = currentLength;

    // Update Word Count (splitting by whitespace, ignoring empty entries)
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    wordCount.textContent = words.length;

    // Apply warning and over classes
    charCount.classList.remove('warning', 'over');
    if (currentLength > 200) {
        charCount.classList.add('over');
    } else if (currentLength > 180) {
        charCount.classList.add('warning');
    }

    // Automatically save draft to localStorage
    localStorage.setItem('noteDraft', text);
}

// Run once on page load to initialize counts
updateCounts();

// 3. Event listeners
noteText.addEventListener('input', updateCounts);

clearBtn.addEventListener('click', () => {
    noteText.value = '';
    updateCounts();
    localStorage.removeItem('noteDraft');
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});