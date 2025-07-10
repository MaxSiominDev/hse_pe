package domain

type CreateNoteRequest struct {
	Subject   string `json:"subject"`
	Topic     string `json:"topic"`
	Level     int    `json:"level"`
	UserNotes string `json:"notes"`
}

type Note struct {
	ID        int    `json:"id"`
	Subject   string `json:"subject"`
	Topic     string `json:"topic"`
	Level     int    `json:"level"`
	Content   string `json:"text"`
	UserNotes string `json:"notes"`
}
