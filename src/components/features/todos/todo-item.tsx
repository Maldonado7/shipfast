'use client'

import { Todo } from '@/stores/todo-store'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  isPending: boolean
}

export function TodoItem({ todo, onToggle, onDelete, isPending }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-4 transition-opacity',
        todo.completed && 'opacity-60',
        isPending && 'pointer-events-none opacity-50'
      )}
      data-testid="todo-item"
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />
      
      <div className="flex-1">
        <h3
          className={cn(
            'font-medium',
            todo.completed && 'line-through'
          )}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {todo.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn('text-xs', priorityColors[todo.priority])}
          >
            {todo.priority}
          </Badge>
          {todo.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </div>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="h-8 w-8 text-destructive hover:text-destructive"
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}