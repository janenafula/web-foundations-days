# QuickNotes API Design Document

## 1. Endpoint Table
| Method | Endpoint | Description | Auth Required |
| GET | /api/v1/notes | Retrieve paginated notes for authenticated user | Yes |
| POST | /api/v1/notes | Create a new note | Yes |
| GET | /api/v1/notes/{id} | Retrieve a specific note by ID | Yes |
| PUT | /api/v1/notes/{id} | Full update of an existing note | Yes |
| DELETE | /api/v1/notes/{id} | Soft delete a note | Yes |

---

## 2. Request & Response Examples

### POST /api/v1/notes
Request Headers:
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

Request Body:
{
  "title": "Meeting Agenda",
  "body": "Discuss Q3 roadmap and budget allocations."
}

Response (201 Created):
{
  "id": "note_9f8e7d6c5b",
  "userId": "usr_12345",
  "title": "Meeting Agenda",
  "body": "Discuss Q3 roadmap and budget allocations.",
  "createdAt": "2026-06-06T12:00:00Z",
  "updatedAt": "2026-06-06T12:00:00Z"
}

---

## 3. Error Codes
- 400 Bad Request (`INVALID_PAYLOAD`): Missing required fields or validation failure (e.g., title > 100 chars).
- 401 Unauthorized (`UNAUTHORIZED`): Missing or expired JWT access token.
- 404 Not Found (`RESOURCE_NOT_FOUND`): The requested note ID does not exist or was deleted.
- 500 Internal Error (`INTERNAL_SERVER_ERROR`): Unexpected database or server failure.
-