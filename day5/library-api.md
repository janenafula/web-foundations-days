# Library REST API Design

This document outlines the REST API design for the library's books resource.

## Endpoints Overview

### 1. List All Books

- Method: GET
- Path: /books
- Description: Retrieve a list of all books available in the library catalog.
- Request Body: None
- Success Status Code: 200 OK

### 2. List Books by Author (Query Parameter)

- Method: GET
- Path: /books?author=AuthorName
- Description: Retrieve a filtered list of books written by a specific author.
- Request Body: None
- Success Status Code: 200 OK

### 3. Get One Book

- Method: GET
- Path: /books/:id
- Description: Retrieve detailed information for a single book by its unique ID.
- Request Body: None
- Success Status Code: 200 OK

### 4. Create a Book

- Method: POST
- Path: /books
- Description: Add a new book to the library collection.
- Request Body Example:
  {
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "publishedYear": 1999,
  "isbn": "978-0201616224"
  }
- Success Status Code: 201 Created

### 5. Update a Book

- Method: PUT (or PATCH)
- Path: /books/:id
- Description: Update an existing book's details by its ID.
- Request Body Example:
  {
  "title": "The Pragmatic Programmer (20th Anniversary Edition)",
  "author": "Andrew Hunt",
  "publishedYear": 2019,
  "isbn": "978-0135957059"
  }
- Success Status Code: 200 OK

### 6. Delete a Book

- Method: DELETE
- Path: /books/:id
- Description: Remove a book from the library catalog using its ID.
- Request Body: None
- Success Status Code: 204 No Content

---

## Error Handling

- 400 Bad Request
  - When it happens: Triggered when the client sends a payload with missing required fields (e.g., omitting the title or author during a POST or PUT request) or sends malformed JSON.
  - Example Response:
    {
    "error": "Bad Request",
    "message": "Missing required field: 'title'."
    }

- 404 Not Found
  - When it happens: Triggered when a client tries to query, update, or delete a book ID that does not exist in the database (e.g., GET /books/9999).
  - Example Response:
    {
    "error": "Not Found",
    "message": "Book with ID 9999 was not found."
    }
