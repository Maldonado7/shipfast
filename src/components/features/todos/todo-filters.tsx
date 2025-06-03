'use client'

import { useTodoStore } from '@/stores/todo-store'
import { Button } from '@/components/ui/button'

export function TodoFilters() {
  const { filter, setFilter } = useTodoStore()

  return (
    <div className="flex gap-2">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('all')}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilter('completed')}
      >
        Completed
      </Button>
    </div>
  )
}