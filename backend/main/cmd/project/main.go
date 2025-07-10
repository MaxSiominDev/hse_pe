package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
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

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS notes (
		 id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        level INTEGER NOT NULL,
		notes TEXT NOT NULL,
        content TEXT NOT NULL
	)`)
	if err != nil {
		log.Fatal("Failed to create table: ", err)
	}

	repo := repositories.NewNotesRepository(db)
	service := services.NewDefaultNotesService(repo)
	notesHandler := handlers.NewNotesHandler(service)

	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all origins
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: false,
		MaxAge:           300, // Cache preflight requests for 5 minutes
	}))

	r.Post("/api/new-note", notesHandler.CreateNote)
	r.Get("/api/notes/{id}", notesHandler.GetNoteByID)
	r.Get("/ping", notesHandler.Ping)

	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
