import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest } from 'next/server'

// Initialize Redis client
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Fallback in-memory cache for development
const cache = new Map()

// Rate limiters for different endpoints
export const authRateLimit = redis 
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
      analytics: true,
    })
  : null

export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
      analytics: true,
    })
  : null

export const strictRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
      analytics: true,
    })
  : null

// Helper function to get client IP
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return request.ip || 'unknown'
}

// Fallback rate limiting for development (in-memory)
function fallbackRateLimit(
  identifier: string, 
  limit: number, 
  windowMs: number
): { success: boolean; remaining: number; reset: Date } {
  const now = Date.now()
  const windowStart = now - windowMs
  
  // Clean old entries
  const key = `ratelimit:${identifier}`
  const requests = cache.get(key) || []
  const validRequests = requests.filter((time: number) => time > windowStart)
  
  if (validRequests.length >= limit) {
    const oldestRequest = Math.min(...validRequests)
    const reset = new Date(oldestRequest + windowMs)
    
    return {
      success: false,
      remaining: 0,
      reset,
    }
  }
  
  // Add current request
  validRequests.push(now)
  cache.set(key, validRequests)
  
  return {
    success: true,
    remaining: limit - validRequests.length,
    reset: new Date(now + windowMs),
  }
}

// Rate limit check function with fallback
export async function checkRateLimit(
  identifier: string,
  rateLimit: Ratelimit | null,
  fallbackLimit: number = 100,
  fallbackWindowMs: number = 60000 // 1 minute
) {
  if (rateLimit) {
    try {
      return await rateLimit.limit(identifier)
    } catch (error) {
      console.error('Rate limit check failed:', error)
      // Fall back to in-memory rate limiting
      return fallbackRateLimit(identifier, fallbackLimit, fallbackWindowMs)
    }
  }
  
  // Development fallback
  return fallbackRateLimit(identifier, fallbackLimit, fallbackWindowMs)
}

// Middleware helper for rate limiting
export async function applyRateLimit(
  request: NextRequest,
  rateLimit: Ratelimit | null,
  fallbackLimit?: number,
  fallbackWindowMs?: number
) {
  const ip = getClientIP(request)
  const result = await checkRateLimit(ip, rateLimit, fallbackLimit, fallbackWindowMs)
  
  return {
    ...result,
    headers: {
      'X-RateLimit-Limit': fallbackLimit?.toString() || '100',
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': result.reset.toISOString(),
    },
  }
}