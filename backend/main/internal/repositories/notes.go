package repositories

import (
	"database/sql"
	"hse_school/internal/domain"
)

type NotesRepository struct {
	db *sql.DB
}

func NewNotesRepository(db *sql.DB) *NotesRepository {
	return &NotesRepository{db: db}
}

func (r *NotesRepository) GetNoteByID(id int) (*domain.Note, error) {

	var note domain.Note
	row := r.db.QueryRow("SELECT id, subject, topic, level, content FROM notes WHERE id = ?", id)
	err := row.Scan(&note.ID, &note.Subject, &note.Topic, &note.Level, &note.Content)
	if err != nil {
		return nil, err
	}
	return &note, nil
}

func (r *NotesRepository) CreateNote(note *domain.Note) (*domain.Note, error) {
	err := r.db.QueryRow(
		"INSERT INTO notes (subject, topic, level, content) VALUES (?, ?, ?, ?) RETURNING id",
		note.Subject,
		note.Topic,
		note.Level,
		note.Content,
	).Scan(&note.ID)

	if err != nil {
		return nil, err
	}

	return note, nil
}
