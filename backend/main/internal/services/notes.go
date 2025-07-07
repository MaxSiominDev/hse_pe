package services

import (
	"context"

	"hse_school/internal/domain"
)

type NotesRepository interface {
	GetNoteByID(id int) (*domain.Note, error)
	CreateNote(note *domain.Note) (*domain.Note, error)
}

// Реализация сервиса
type NotesService struct {
	repo NotesRepository
}

func NewDefaultNotesService(repo NotesRepository) *NotesService {
	return &NotesService{repo: repo}
}

func (s *NotesService) GetNoteByID(ctx context.Context, id int) (*domain.Note, error) {
	return s.repo.GetNoteByID(id)
}

func (s *NotesService) CreateNote(ctx context.Context, note *domain.Note) (*domain.Note, error) {
	return s.repo.CreateNote(note)
}
