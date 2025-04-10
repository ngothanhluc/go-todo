package main

import (
	"time"
	"todo-app/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Your frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.GET("/todos", handlers.GetTodos)
	router.POST("/todos", handlers.CreateTodo)
	router.PUT("/todos/:id", handlers.UpdateTodo)
	router.DELETE("/todos/:id", handlers.DeleteTodo)
	router.Run(":8080")
}
