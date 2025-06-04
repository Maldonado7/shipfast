import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // In development without proper Supabase setup, skip middleware
  const isDevelopment = process.env.NODE_ENV === 'development';
  const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co');
  
  if (isDevelopment && !hasSupabase) {
    return NextResponse.next();
  }

  try {
    // Only run Supabase middleware if properly configured
    const { updateSession } = await import('@/lib/supabase/middleware');
    return await updateSession(request);
  } catch (error) {
    console.warn('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
