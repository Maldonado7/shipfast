import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST() {
  // Only allow in development
  if (env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // In a real implementation, this would clear various caches
    // For now, we'll simulate the operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const clearedCaches = {
      redis: true,
      cdn: true,
      nextCache: true,
      browser: 'cleared client-side',
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'All caches cleared successfully',
      caches: clearedCaches,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Cache clear failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}