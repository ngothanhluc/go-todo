import { PlusCircle } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="space-y-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title..."
          className="w-full"
        />
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full"
        />
      </div>
      <Button type="submit" disabled={!title.trim()} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Todo
      </Button>
    </form>
  );
}
