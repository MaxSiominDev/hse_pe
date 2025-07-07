package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"

	"hse_school/internal/domain"
)

type NotesService interface {
	GetNoteByID(ctx context.Context, id int) (*domain.Note, error)
	CreateNote(ctx context.Context, note *domain.Note) (*domain.Note, error)
}

type NotesHandler struct {
	service NotesService
}

func NewNotesHandler(service NotesService) *NotesHandler {
	return &NotesHandler{service: service}
}

func (h *NotesHandler) CreateNote(w http.ResponseWriter, r *http.Request) {
	var noteRequest domain.CreateNoteRequest
	err := json.NewDecoder(r.Body).Decode(&noteRequest)
	if err != nil {
		http.Error(w, "Invalid note ID", http.StatusBadRequest)
		return
	}

	note := domain.Note{0, noteRequest.Subject, noteRequest.Topic, noteRequest.Level, "Hello world"}

	service := h.service
	service.CreateNote(r.Context(), &note)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(&note)
}

func (h *NotesHandler) Ping(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Ping")
}

func (h *NotesHandler) GetNoteByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	noteID := 0
	var err error
	if noteID, err = strconv.Atoi(id); err != nil {
		http.Error(w, "Invalid note ID", http.StatusBadRequest)
		return
	}

	note, err := h.service.GetNoteByID(r.Context(), noteID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(note)
}
