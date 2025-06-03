import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST() {
  // Only allow in development
  if (env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // In a real implementation, this would seed the database
    // For now, we'll simulate the operation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const seedData = {
      users: 10,
      todos: 50,
      profiles: 10,
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      data: seedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Seeding failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}