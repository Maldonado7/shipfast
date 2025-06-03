import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST() {
  // Only allow in development
  if (env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // In a real implementation, this would clear all user sessions
    // For now, we'll simulate the operation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json({ 
      success: true, 
      message: 'All user sessions cleared',
      sessionsCleared: Math.floor(Math.random() * 10) + 1,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to clear sessions', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}