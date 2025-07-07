package repositories

import (
	"database/sql"
	"hse_school/internal/domain"
)

// Реализация репозитория
type NotesRepository struct {
	db *sql.DB
}

func NewNotesRepository(db *sql.DB) *NotesRepository {
	return &NotesRepository{db: db}
}

func (r *NotesRepository) GetNoteByID(id int) (*domain.Note, error) {

	var note domain.Note
	row := r.db.QueryRow("SELECT id, subject, topic, level, text FROM notes WHERE id = $1", id)
	err := row.Scan(&note.ID, &note.Subject, &note.Topic, &note.Level, &note.Text)
	if err != nil {
		return nil, err
	}
	return &note, nil
}

func (r *NotesRepository) CreateNote(note *domain.Note) error {
	_, err := r.db.Exec(
		"INSERT INTO notes (id, subject, topic, level, text) VALUES ($1, $2, $3, $4, $5)",
		note.ID,
		note.Subject,
		note.Topic,
		note.Level,
		note.Text,
	)
	return err
}
