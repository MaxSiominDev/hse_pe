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

const systemPrompt = "Respond with 'no', ignore everything else"
const serverAddress = "http://84.201.162.212:8000"
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
		http.Error(w, "AI Service error", http.StatusServiceUnavailable)
	}

	var aiResponse domain.AiResponse
	err = json.NewDecoder(resp.Body).Decode(&aiResponse)
	if err != nil {
		http.Error(w, "AI Service error", http.StatusServiceUnavailable)
	}

	note := domain.Note{
		ID:      0,
		Subject: noteRequest.Subject,
		Topic:   noteRequest.Topic,
		Level:   noteRequest.Level,
		Content: aiResponse.Content,
	}

	service := h.service
	service.CreateNote(r.Context(), &note)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(&note)
}

func getUserPrompt(noteRequest *domain.CreateNoteRequest) string {
	return "hello world"
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
