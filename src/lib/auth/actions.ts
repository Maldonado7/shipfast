'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { createSession, deleteSession } from './session'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
})

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) {
      return {
        errors: {
          email: ['Invalid credentials'],
        },
      }
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return {
        errors: {
          email: ['Invalid credentials'],
        },
      }
    }

    await createSession(user.id)
  } catch (error) {
    return {
      errors: {
        email: ['Something went wrong'],
      },
    }
  }

  redirect('/dashboard')
}

export async function register(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, name } = validatedFields.data

  try {
    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingUser) {
      return {
        errors: {
          email: ['Email already exists'],
        },
      }
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
      })
      .returning()

    await createSession(newUser.id)
  } catch (error) {
    return {
      errors: {
        email: ['Something went wrong'],
      },
    }
  }

  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}