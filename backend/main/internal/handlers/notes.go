package handlers

import (
	"bytes"
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

const systemPrompt = ""
const serverAddress = "http://89.169.188.212:8000"
const aiRequestUrl = serverAddress + "/ask"

func (h *NotesHandler) CreateNote(w http.ResponseWriter, r *http.Request) {
	var noteRequest domain.CreateNoteRequest
	err := json.NewDecoder(r.Body).Decode(&noteRequest)
	if err != nil {
		http.Error(w, "Invalid note ID", http.StatusBadRequest)
		return
	}

	userPrompt := getUserPrompt(&noteRequest)
	requestData := domain.AiRequest{SystemPrompt: systemPrompt, UserPrompt: userPrompt}

	jsonData, err := json.Marshal(requestData)
	if err != nil {
		http.Error(w, "Error preparing request to microservice", http.StatusInternalServerError)
		return
	}

	resp, err := http.Post(aiRequestUrl, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}

	var aiResponse domain.AiResponse
	err = json.NewDecoder(resp.Body).Decode(&aiResponse)
	if err != nil {
		http.Error(w, "AI Service parsing error", http.StatusServiceUnavailable)
		return
	}

	note := domain.Note{
		ID:        0,
		Subject:   noteRequest.Subject,
		Topic:     noteRequest.Topic,
		Level:     noteRequest.Level,
		Content:   aiResponse.Content,
		UserNotes: noteRequest.UserNotes,
	}

	service := h.service
	service.CreateNote(r.Context(), &note)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(&note)
}

func getUserPrompt(noteRequest *domain.CreateNoteRequest) string {
	levelTemplates := []string{
		"По предмету: %s, по теме: %s, расширь на уровне базовый (сухой конспект без примеров и пояснений) до полноценного конспекта записи: %s",
		"По предмету: %s, по теме: %s, расширь на уровне среднем (конспект с минимумом пояснений) до полноценного конспекта записи: %s",
		"По предмету: %s, по теме: %s, расширь на уровне базовый (конспект с примерами и пояснениями и сложными случаями) до полноценного конспекта записи: %s",
	}

	level := noteRequest.Level
	if level < 0 || level > 2 {
		level = 0 // fallback to basic level
	}

	return fmt.Sprintf(
		levelTemplates[level],
		noteRequest.Subject,
		noteRequest.Topic,
		noteRequest.UserNotes,
	)
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
