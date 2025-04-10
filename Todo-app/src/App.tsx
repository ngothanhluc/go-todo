import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Spinner } from "./components/ui/spinner";
import {
  useCreateTodo,
  useDeleteTodo,
  useTodos,
  useToggleTodoCompletion,
} from "./hooks/useTodoQueries";

function App() {
  // Fetch todos using TanStack Query
  const { data: todos = [], isLoading, isError } = useTodos();

  // Mutations for creating, toggling, and deleting todos
  const createTodoMutation = useCreateTodo();
  const toggleTodoMutation = useToggleTodoCompletion();
  const deleteTodoMutation = useDeleteTodo();

  // Handler functions
  const handleAddTodo = (title: string, description: string) => {
    // Pass both title and description to the mutation function
    createTodoMutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          // You can add additional logic here after successful creation
        },
      }
    );
  };

  const handleToggleTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      toggleTodoMutation.mutate({ id, completed: !todo.completed });
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter">Todo App</h1>
            <p className="text-muted-foreground">
              Manage your tasks with this simple todo app.
            </p>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <TodoForm onAddTodo={handleAddTodo} />

            {isLoading ? (
              <div className="text-center p-4 flex items-center justify-center gap-2">
                <Spinner />
                <span>Loading todos...</span>
              </div>
            ) : isError ? (
              <div className="text-center p-4 text-destructive">
                Error loading todos. Please try again.
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Built with Vite, React, shadcn/ui, Tailwind CSS, and TanStack
              Query
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
