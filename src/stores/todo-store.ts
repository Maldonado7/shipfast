import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

export interface Todo {
  id: number
  title: string
  description?: string | null
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date | null
  userId: number
  createdAt: Date
  updatedAt: Date
}

interface TodoState {
  todos: Todo[]
  isLoading: boolean
  error: string | null
  filter: 'all' | 'active' | 'completed'
}

interface TodoActions {
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (id: number, updates: Partial<Todo>) => void
  deleteTodo: (id: number) => void
  toggleTodo: (id: number) => void
  setFilter: (filter: TodoState['filter']) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useTodoStore = create<TodoState & TodoActions>()(
  devtools(
    immer((set) => ({
      todos: [],
      isLoading: false,
      error: null,
      filter: 'all',

      setTodos: (todos) =>
        set((state) => {
          state.todos = todos
          state.error = null
        }),

      addTodo: (todo) =>
        set((state) => {
          state.todos.push(todo)
          state.error = null
        }),

      updateTodo: (id, updates) =>
        set((state) => {
          const index = state.todos.findIndex((t) => t.id === id)
          if (index !== -1) {
            state.todos[index] = { ...state.todos[index], ...updates }
          }
        }),

      deleteTodo: (id) =>
        set((state) => {
          state.todos = state.todos.filter((t) => t.id !== id)
        }),

      toggleTodo: (id) =>
        set((state) => {
          const todo = state.todos.find((t) => t.id === id)
          if (todo) {
            todo.completed = !todo.completed
          }
        }),

      setFilter: (filter) =>
        set((state) => {
          state.filter = filter
        }),

      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading
        }),

      setError: (error) =>
        set((state) => {
          state.error = error
        }),
    })),
    {
      name: 'TodoStore',
    }
  )
)