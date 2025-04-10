package handlers

import (
	"fmt"
	"net/http"
	"todo-app/models"

	"github.com/gin-gonic/gin"
)

var todos = make(map[uint]*models.Todo)
var idCounter uint = 1

//Func getTodos return all todos

func GetTodos(c *gin.Context) {
	todoList := make([]*models.Todo, 0, len(todos))
	for _, todo := range todos {
		todoList = append(todoList, todo)
	}
	c.JSON(200, todoList)
}

func CreateTodo(c *gin.Context) {
	var newTodo models.Todo

	// Bind JSON input to the newTodo struct
	if err := c.ShouldBindJSON(&newTodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input:" + err.Error()})
		return
	}

	newTodo.ID = idCounter

	// Check valid Title

	if newTodo.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	if !newTodo.Completed {
		newTodo.Completed = false
	}

	todos[idCounter] = &newTodo
	idCounter++

	c.JSON(http.StatusCreated, newTodo)
}

func UpdateTodo(c *gin.Context) {
	id := c.Param("id")
	var todoID uint
	if _, err := fmt.Sscanf(id, "%d", &todoID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid todo ID"})
		return
	}

	todo, exists := todos[todoID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	var updatedTodo models.Todo

	// Bind JSON input to the updatedTodo struct
	if err := c.ShouldBindJSON(&updatedTodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if updatedTodo.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	// Preserve the original ID
	updatedTodo.ID = todoID

	// Update the todo
	*todo = updatedTodo

	c.JSON(http.StatusOK, todo)
}

func DeleteTodo(c *gin.Context) {
	id := c.Param("id")
	var todoID uint
	if _, err := fmt.Sscanf(id, "%d", &todoID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid todo ID"})
		return
	}

	_, exists := todos[todoID]
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	// Delete the todo
	delete(todos, todoID)

	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}
