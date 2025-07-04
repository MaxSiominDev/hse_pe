package domain

type CreateNoteRequest struct {
	Subject string `json:"subject"`
	Topic   string `json:"topic"`
	Level   int    `json:"level"`
}

type Note struct {
	ID      int    `json:"id"`
	Subject string `json:"subject"`
	Topic   string `json:"topic"`
	Level   int    `json:"level"`
	Text    string `json:"text"`
}
