import { Suspense } from 'react'
import { getTodos } from '@/lib/actions/supabase-todo-actions'
import { TodoList } from '@/components/features/todos/todo-list'
import { AddTodoForm } from '@/components/features/todos/add-todo-form'
import { TodoFilters } from '@/components/features/todos/todo-filters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function TodosPage() {
  const result = await getTodos()
  
  if (!result.success) {
    return <div>Failed to load todos</div>
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="mb-8 text-3xl font-bold">My Todos</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTodoForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todo List</CardTitle>
            <TodoFilters />
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading todos...</div>}>
            <TodoList initialTodos={result.data || []} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}