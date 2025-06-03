import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let connection: postgres.Sql<{}>
let db: ReturnType<typeof drizzle>
let connectionAttempts = 0
const MAX_RETRY_ATTEMPTS = 5
const RETRY_DELAY = 5000 // 5 seconds

async function createConnection(): Promise<void> {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined')
    }

    connection = postgres(process.env.DATABASE_URL, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
    })

    // Test the connection
    await connection`SELECT 1`
    
    db = drizzle(connection, { schema })
    console.log('✅ Database connected successfully')
  } catch (error) {
    connectionAttempts++
    console.error(`❌ Database connection attempt ${connectionAttempts} failed:`, error)
    
    if (connectionAttempts < MAX_RETRY_ATTEMPTS) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return createConnection()
    } else {
      throw new Error('Failed to connect to database after multiple attempts')
    }
  }
}

// Initialize connection
if (!db) {
  createConnection().catch(error => {
    console.error('Fatal: Could not establish database connection', error)
    process.exit(1)
  })
}

export { db }
export type Database = typeof db