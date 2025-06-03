'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { todos, userProfiles } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'

async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

export async function getTodos() {
  try {
    const user = await getUser()
    
    const userTodos = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, user.id))
      .orderBy(desc(todos.createdAt))

    return { success: true, data: userTodos }
  } catch (error) {
    return { success: false, error: 'Failed to fetch todos' }
  }
}

export async function createTodo(data: {
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  dueDate?: Date
}) {
  try {
    const user = await getUser()
    
    // Ensure user profile exists
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1)
    
    if (!profile) {
      // Create user profile if it doesn't exist
      await db
        .insert(userProfiles)
        .values({
          id: user.id,
          email: user.email!,
          fullName: user.user_metadata?.full_name || null,
        })
    }

    const [newTodo] = await db
      .insert(todos)
      .values({
        ...data,
        userId: user.id,
      })
      .returning()

    revalidatePath('/dashboard/todos')
    return { success: true, data: newTodo }
  } catch (error) {
    return { success: false, error: 'Failed to create todo' }
  }
}

export async function updateTodo(
  id: number,
  data: Partial<{
    title: string
    description: string | null
    completed: boolean
    priority: 'low' | 'medium' | 'high'
    dueDate: Date | null
  }>
) {
  try {
    const user = await getUser()

    const [updatedTodo] = await db
      .update(todos)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userId, user.id)
        )
      )
      .returning()

    // Broadcast real-time update
    const supabase = await createClient()
    await supabase
      .from('todos')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.id)

    revalidatePath('/dashboard/todos')
    return { success: true, data: updatedTodo }
  } catch (error) {
    return { success: false, error: 'Failed to update todo' }
  }
}

export async function deleteTodo(id: number) {
  try {
    const user = await getUser()

    await db
      .delete(todos)
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userId, user.id)
        )
      )

    // Broadcast real-time delete
    const supabase = await createClient()
    await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    revalidatePath('/dashboard/todos')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete todo' }
  }
}

export async function toggleTodo(id: number) {
  try {
    const user = await getUser()

    // First get the current state
    const [todo] = await db
      .select()
      .from(todos)
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userId, user.id)
        )
      )
      .limit(1)

    if (!todo) {
      throw new Error('Todo not found')
    }

    // Toggle the completed state
    const [updatedTodo] = await db
      .update(todos)
      .set({
        completed: !todo.completed,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning()

    // Broadcast real-time update
    const supabase = await createClient()
    await supabase
      .from('todos')
      .update({ 
        completed: !todo.completed, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .eq('user_id', user.id)

    revalidatePath('/dashboard/todos')
    return { success: true, data: updatedTodo }
  } catch (error) {
    return { success: false, error: 'Failed to toggle todo' }
  }
}

// Real-time subscription hook for client components
export async function subscribeToTodos() {
  const user = await getUser()
  const supabase = await createClient()
  
  return supabase
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
        console.log('Real-time todo update:', payload)
        revalidatePath('/dashboard/todos')
      }
    )
    .subscribe()
}