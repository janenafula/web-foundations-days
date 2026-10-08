let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest
  );
}

function countByCategory() {
  const counts = {
    personal: 0,
    work: 0,
    study: 0
  };

  notes.forEach(note => {
    counts[note.category]++;
  });

  return counts;
}

function getSummary() {
  const counts = countByCategory();

  return `${notes.length} notes: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

function isDuplicate(text) {
  const cleanedText = text.trim().replace(/\s+/g, " ").toLowerCase();

  return notes.some(note =>
    note.text.trim().replace(/\s+/g, " ").toLowerCase() === cleanedText
  );
}

function addNote(text, category) {
  const cleanedText = text.trim().replace(/\s+/g, " ");
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("Note must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("Note is a duplicate.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Invalid category.");
    return false;
  }

  const newId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  notes.push({
    id: newId,
    text: cleanedText,
    category: category
  });

  return true;
}

// Tests
console.log("Search:", searchNotes("day"));
console.log("Longest note:", longestNote());
console.log("Count by category:", countByCategory());
console.log("Summary:", getSummary());
console.log("Duplicate:", isDuplicate("  CALL   MUM "));
console.log("Add valid note:", addNote("Prepare for tomorrow", "study"));
console.log("Add duplicate:", addNote("Call mum", "personal"));
console.log("Add invalid category:", addNote("Buy a notebook", "shopping"));
console.log("Notes after adding:", notes);