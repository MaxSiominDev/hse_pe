package domain

type AiRequest struct {
	SystemPrompt string `json:"system_prompt"`
	UserPrompt   string `json:"user_prompt"`
}

type AiResponse struct {
	Content string `json:"ai_response"`
}
