'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Database } from '@/lib/supabase/types'

type Todo = Database['public']['Tables']['todos']['Row']

export function useRealtimeTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setTodos(initialTodos)
  }, [initialTodos])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const channel = supabase
        .channel('todos')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'todos',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('Real-time change:', payload)
            
            if (payload.eventType === 'INSERT') {
              setTodos((current) => [payload.new as Todo, ...current])
            } else if (payload.eventType === 'UPDATE') {
              setTodos((current) =>
                current.map((todo) =>
                  todo.id === payload.new.id ? (payload.new as Todo) : todo
                )
              )
            } else if (payload.eventType === 'DELETE') {
              setTodos((current) =>
                current.filter((todo) => todo.id !== payload.old.id)
              )
            }
            
            // Refresh the page data to ensure consistency
            router.refresh()
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }

    getUser()
  }, [supabase, router])

  return todos
}