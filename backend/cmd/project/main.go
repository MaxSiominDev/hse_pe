package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	_ "github.com/mattn/go-sqlite3"

	"hse_school/internal/handlers"
	"hse_school/internal/repositories"
	"hse_school/internal/services"
)

func main() {
	db, err := sql.Open("sqlite3", "notes.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	repo := repositories.NewNotesRepository(db)
	service := services.NewDefaultNotesService(repo)
	notesHandler := handlers.NewNotesHandler(service)

	r := chi.NewRouter()
	r.Post("/api/new-note", notesHandler.CreateNote)
	r.Get("/api/notes/{id}", notesHandler.GetNoteByID)
	r.Get("/ping", notesHandler.Ping)

	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
