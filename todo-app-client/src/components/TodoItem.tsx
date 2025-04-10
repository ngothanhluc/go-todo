import { Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex flex-col p-4 border rounded-md mb-2 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={`text-sm font-medium ${
              todo.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {todo.title}
          </label>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      {todo.description && (
        <div className="mt-2 pl-6 text-sm text-muted-foreground">
          {todo.description}
        </div>
      )}
    </div>
  );
}
