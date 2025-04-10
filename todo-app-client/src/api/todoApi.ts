import api from '../lib/axios';
import type { Todo } from '../types/todo';

// Define the API response types
interface TodoResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get<TodoResponse[]>('/todos');
  console.log('🚀 ~ getTodos ~ response:', response);

  return response.data;
};

// Get a single todo by ID
export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await api.get<TodoResponse>(`/todos/${id}`);
  return response.data;
};

// Create a new todo
export const createTodo = async (
  title: string,
  description = ''
): Promise<Todo> => {
  const response = await api.post<TodoResponse>('/todos', {
    title,
    description,
    completed: false,
  });
  return response.data;
};

// Update a todo
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await api.put<TodoResponse>(`/todos/${todo.id}`, todo);
  return response.data;
};

// Toggle todo completion status
export const toggleTodoCompletion = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  const response = await api.patch<TodoResponse>(`/todos/${id}`, { completed });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
