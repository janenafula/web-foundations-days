# School Database Design

## 1. Tables

### Students
The students table stores each student's unique ID, name and email address. The student_id is the primary key, while email is required and must be unique so that two students cannot register with the same email.

### Courses
The courses table stores each course's unique ID, course name and optional description. The course_id is the primary key, and course_name is required and unique.

### Enrolments
The enrolments table records which students take which courses. It stores student_id, course_id, grade and enrolment date. The combination of student_id and course_id forms a composite primary key, preventing the same student from enrolling in the same course twice. Foreign keys connect each enrolment to an existing student and course.

## 2. Relationships

Students and enrolments have a one-to-many relationship because one student can have several enrolments, but each enrolment belongs to one student.

Courses and enrolments also have a one-to-many relationship because one course can have many enrolled students, but each enrolment refers to one course.

Students and courses have a many-to-many relationship: one student can take several courses, and one course can have several students. The enrolments table is needed as a join table to represent this relationship and store information about each enrolment, such as the student's grade.

## 3. Index

I would add an index on enrolments(course_id). This can help the database find all students enrolled in a particular course and calculate enrolment counts more efficiently. The index is useful because course_id is frequently used when searching and joining enrolment records.

## 4. SQL or NoSQL?

I would choose 