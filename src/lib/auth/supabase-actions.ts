'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        errors: {
          email: [error.message],
        },
      }
    }

    revalidatePath('/', 'layout')
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
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      return {
        errors: {
          email: [error.message],
        },
      }
    }

    revalidatePath('/', 'layout')
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
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signInWithProvider(provider: 'github' | 'google') {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.url) {
    redirect(data.url)
  }
}