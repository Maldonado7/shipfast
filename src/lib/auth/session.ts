import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode(process.env.AUTH_SECRET || 'default-secret-key')

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)
}

export async function decrypt(input: string | undefined): Promise<any> {
  if (!input) return null
  
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expires })

  ;(await cookies()).set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  if (!session) return

  const parsed = await decrypt(session)
  if (!parsed) return

  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const res = await encrypt(parsed)

  ;(await cookies()).set('session', res, {
    expires: parsed.expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  ;(await cookies()).delete('session')
}