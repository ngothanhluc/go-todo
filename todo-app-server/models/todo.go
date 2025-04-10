package models

type Todo struct {
	ID          uint   `json:"id"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}
