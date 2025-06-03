'use client'

import { useTransition } from 'react'
import { TodoItem } from './todo-item'
import { toggleTodo, deleteTodo } from '@/lib/actions/supabase-todo-actions'
import { useToast } from '@/components/ui/use-toast'
import { useRealtimeTodos } from '@/hooks/use-realtime-todos'
import { useTodoStore } from '@/stores/todo-store'
import type { Database } from '@/lib/supabase/types'

type Todo = Database['public']['Tables']['todos']['Row']

interface TodoListProps {
  initialTodos: Todo[]
}

export function TodoList({ initialTodos }: TodoListProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const { filter } = useTodoStore()
  
  // Use real-time subscription
  const todos = useRealtimeTodos(initialTodos)

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleToggle = (id: number) => {
    startTransition(async () => {
      const result = await toggleTodo(id)
      if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to update todo',
          variant: 'destructive',
        })
      }
    })
  }

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const result = await deleteTodo(id)
      if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete todo',
          variant: 'destructive',
        })
      }
    })
  }

  if (filteredTodos.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No todos found. Create one to get started!
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
          isPending={isPending}
        />
      ))}
    </div>
  )
}