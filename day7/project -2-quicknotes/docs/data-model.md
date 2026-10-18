x# QuickNotes Data Model Document

## 1. Entities & Relationships
1. User: Represents a registered user of QuickNotes.
2. Note: Represents an individual note authored by a user.
3. Tag: Allows users to categorize notes.
4. NoteTag: Junction table establishing a many-to-many relationship between Notes and Tags.

Relationships:
- One User has many Notes (1:N).
- One Note can have many Tags, and one Tag can belong to many Notes (N:M via note_tags).

---

## 2. SQL Schema (CREATE TABLE Statements)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    UNIQUE(user_id, name)
);

CREATE TABLE note_tags (
    note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (note_id, tag_id)
);

---

## 3. Indexes & Performance
- CREATE INDEX idx_notes_user_id_created ON notes(user_id, created_at DESC); (Optimizes fetching a user's notes feed sorted by most recent).
- CREATE INDEX idx_notes_search ON notes USING gin(to_tsvector('english', title || ' ' || body)); (Optimizes full-text search across notes).

---

## 4. SQL vs. NoSQL Decision
Decision: Relational SQL (PostgreSQL).
Rationale: Notes require strong relational integrity (constrained strictly to valid users), transactional safety (ACID compliance), and structured relational querying/indexing for high-performance multi-tenant feeds under 1 million active users.