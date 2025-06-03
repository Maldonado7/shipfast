import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { cache } from 'react'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    return { isAuth: false, userId: null }
  }

  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session.isAuth || !session.userId) return null

  try {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1)

    return user
  } catch (error) {
    console.error('Failed to fetch user', error)
    return null
  }
})