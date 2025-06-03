import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection
    await db.execute('SELECT 1' as any)
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        server: 'running',
      },
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected',
          server: 'running',
        },
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}