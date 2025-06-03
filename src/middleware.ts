import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { applyRateLimit, authRateLimit, apiRateLimit, strictRateLimit } from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  // Handle Supabase auth session refresh
  const { supabaseResponse, user } = await updateSession(request)

  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    let rateLimitResult
    
    // Different rate limits for different endpoints
    if (request.nextUrl.pathname.includes('/auth/')) {
      // Strict rate limiting for auth endpoints
      rateLimitResult = await applyRateLimit(request, authRateLimit, 5, 15 * 60 * 1000)
    } else if (request.nextUrl.pathname.includes('/health')) {
      // Relaxed rate limiting for health checks
      rateLimitResult = await applyRateLimit(request, apiRateLimit, 200, 60 * 1000)
    } else {
      // Standard rate limiting for other API endpoints
      rateLimitResult = await applyRateLimit(request, apiRateLimit, 100, 60 * 1000)
    }
    
    // If rate limit exceeded, return 429
    if (!rateLimitResult.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...rateLimitResult.headers,
          },
        }
      )
    }
    
    // Handle CORS for API routes
    const response = NextResponse.next()
    
    // Add rate limit headers
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: response.headers })
    }
    
    return response
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (request.nextUrl.pathname.match(/^\/(login|register)/)) {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Enhanced security headers
  const response = supabaseResponse
  
  // Basic security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy (updated for Supabase)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https: *.supabase.co",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "connect-src 'self' *.supabase.co",
    "block-all-mixed-content",
    "upgrade-insecure-requests"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  // HSTS for HTTPS
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}