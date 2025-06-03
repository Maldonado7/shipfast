import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function POST() {
  // Only allow in development
  if (env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // In a real implementation, this would create a test user
    // For now, we'll simulate the operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const testUser = {
      id: `test-${Date.now()}`,
      email: `test-${Date.now()}@example.com`,
      password: 'test123456',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test user created successfully',
      user: testUser,
      note: 'Save these credentials for testing'
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to create test user', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}