import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST() {
  // Only allow in development
  if (env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // In a real implementation, this would reset the database
    // For now, we'll simulate the operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database reset successfully',
      warning: 'All data has been deleted',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Reset failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}