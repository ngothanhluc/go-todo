import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  toggleTodoCompletion,
  updateTodo,
} from '../api/todoApi';
import type { Todo } from '../types/todo';

// Query keys
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};

// Get all todos
export const useTodos = () => {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: getTodos,
  });
};

// Get a single todo
export const useTodo = (id: number) => {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => getTodoById(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      description,
    }: { title: string; description: string }) =>
      createTodo(title, description),
    onSuccess: (newTodo) => {
      // Invalidate the todos list query to refetch
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });

      // Alternatively, update the cache directly
      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (oldTodos = []) => {
        return [...oldTodos, newTodo];
      });
    },
  });
};

// Update a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSuccess: (updatedTodo) => {
      // Invalidate the specific todo query
      queryClient.invalidateQueries({
        queryKey: todoKeys.detail(updatedTodo.id),
      });

      // Update the todos list in the cache
      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (oldTodos = []) => {
        return oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
    },
  });
};

// Toggle todo completion status
export const useToggleTodoCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodoCompletion(id, completed),
    onSuccess: (updatedTodo) => {
      // Invalidate the specific todo query
      queryClient.invalidateQueries({
        queryKey: todoKeys.detail(updatedTodo.id),
      });

      // Update the todos list in the cache
      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (oldTodos = []) => {
        return oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: (_, id) => {
      // Invalidate the todos list query
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });

      // Remove the todo from the cache
      queryClient.setQueryData<Todo[]>(todoKeys.lists(), (oldTodos = []) => {
        return oldTodos.filter((todo) => todo.id !== id);
      });

      // Remove the specific todo query from the cache
      queryClient.removeQueries({ queryKey: todoKeys.detail(id) });
    },
  });
};
