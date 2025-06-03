import { db } from './index'
import { users, todos } from './schema'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    const [user1, user2] = await db.insert(users).values([
      {
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
        role: 'user',
        emailVerified: true,
      },
      {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin',
        emailVerified: true,
      },
    ]).returning()

    console.log('✅ Created users:', user1.email, user2.email)

    // Create test todos
    await db.insert(todos).values([
      {
        title: 'Complete project setup',
        description: 'Set up the Next.js project with all necessary configurations',
        completed: true,
        priority: 'high',
        userId: user1.id,
      },
      {
        title: 'Write documentation',
        description: 'Create comprehensive documentation for the project',
        completed: false,
        priority: 'medium',
        userId: user1.id,
      },
      {
        title: 'Add tests',
        description: 'Write unit and integration tests',
        completed: false,
        priority: 'high',
        userId: user1.id,
      },
      {
        title: 'Review pull requests',
        description: 'Review and merge pending pull requests',
        completed: false,
        priority: 'medium',
        userId: user2.id,
      },
    ])

    console.log('✅ Created test todos')
    console.log('🎉 Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()