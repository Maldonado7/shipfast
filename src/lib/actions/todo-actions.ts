'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { todos } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { verifySession } from '@/lib/auth/dal'

export async function getTodos() {
  const session = await verifySession()
  if (!session.isAuth || !session.userId) {
    throw new Error('Unauthorized')
  }

  try {
    const userTodos = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, session.userId))
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
  const session = await verifySession()
  if (!session.isAuth || !session.userId) {
    throw new Error('Unauthorized')
  }

  try {
    const [newTodo] = await db
      .insert(todos)
      .values({
        ...data,
        userId: session.userId,
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
  const session = await verifySession()
  if (!session.isAuth || !session.userId) {
    throw new Error('Unauthorized')
  }

  try {
    const [updatedTodo] = await db
      .update(todos)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userId, session.userId)
        )
      )
      .returning()

    revalidatePath('/dashboard/todos')
    return { success: true, data: updatedTodo }
  } catch (error) {
    return { success: false, error: 'Failed to update todo' }
  }
}

export async function deleteTodo(id: number) {
  const session = await verifySession()
  if (!session.isAuth || !session.userId) {
    throw new Error('Unauthorized')
  }

  try {
    await db
      .delete(todos)
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userId, session.userId)
        )
      )

    revalidatePath('/dashboard/todos')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete todo' }
  }
}

export async function toggleTodo(id: number) {
  const session = await verifySession()
  if (!session.isAuth || !session.userId) {
    throw new Error('Unauthorized')
  }

  try {
    // First get the current state
    const [todo] = await db
      .select()
      .from(todos)
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userId, session.userId)
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

    revalidatePath('/dashboard/todos')
    return { success: true, data: updatedTodo }
  } catch (error) {
    return { success: false, error: 'Failed to toggle todo' }
  }
}