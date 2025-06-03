# ShipFast Development Rules

This document defines the coding standards, architectural decisions, and best practices for the ShipFast template. All contributors must follow these rules to maintain consistency and quality.

## 🏗️ Architecture Rules

### 1. **File Structure**
```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Auth group routes
│   ├── (dashboard)/       # Protected routes
│   ├── api/               # API routes
│   └── components/        # Route-specific components
├── components/            # Shared components
│   ├── ui/               # Base UI components
│   └── features/         # Feature components
├── lib/                   # Core libraries
│   ├── auth/             # Authentication logic
│   ├── db/               # Database queries
│   └── utils/            # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript types
```

### 2. **Data Flow**
- **NEVER** access database directly from components
- **ALWAYS** use Data Access Layer (DAL) pattern
- **ALWAYS** validate data at the edge (API routes/Server Actions)
- **NEVER** trust client-side data

### 3. **Component Architecture**
- **Server Components** by default
- **Client Components** only when needed (interactivity, hooks)
- **ALWAYS** mark Client Components with `'use client'`
- **NEVER** import server-only code in Client Components

## 📝 Coding Standards

### 1. **TypeScript**
```typescript
// ✅ GOOD: Explicit types
interface UserProps {
  id: string;
  name: string;
  email: string;
}

// ❌ BAD: Any or implicit types
const user: any = { ... };

// ✅ GOOD: Type-safe database queries
const users = await db.select().from(usersTable).where(eq(usersTable.id, id));

// ❌ BAD: Untyped queries
const users = await db.query(`SELECT * FROM users`);
```

### 2. **React Components**
```typescript
// ✅ GOOD: Functional components with proper types
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ BAD: Untyped props or class components
export default class Button extends React.Component { ... }
```

### 3. **Async/Await**
```typescript
// ✅ GOOD: Async/await with error handling
try {
  const data = await fetchData();
  return { success: true, data };
} catch (error) {
  console.error('Failed to fetch:', error);
  return { success: false, error: 'Failed to fetch data' };
}

// ❌ BAD: Unhandled promises
fetchData().then(data => console.log(data));
```

## 🔐 Security Rules

### 1. **Authentication**
- **ALWAYS** check authentication in Server Components/API routes
- **NEVER** expose sensitive data in client components
- **ALWAYS** use Supabase RLS for additional security
- **NEVER** store sensitive data in localStorage

### 2. **API Security**
```typescript
// ✅ GOOD: Validate and sanitize input
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

export async function POST(req: Request) {
  const body = await req.json();
  const validated = schema.parse(body); // Throws if invalid
  // ... rest of logic
}

// ❌ BAD: Direct usage without validation
export async function POST(req: Request) {
  const { email, name } = await req.json();
  await db.insert(users).values({ email, name }); // SQL injection risk!
}
```

### 3. **Environment Variables**
- **ALWAYS** validate env vars at startup
- **NEVER** commit .env files
- **ALWAYS** use NEXT_PUBLIC_ prefix for client-side vars
- **NEVER** expose secret keys to client

## 🎨 UI/UX Rules

### 1. **Styling**
- **ALWAYS** use Tailwind CSS classes
- **NEVER** use inline styles unless dynamic
- **ALWAYS** use CSS variables for theming
- **FOLLOW** mobile-first responsive design

```tsx
// ✅ GOOD: Tailwind classes with responsive design
<div className="px-4 py-2 md:px-6 md:py-4 dark:bg-gray-800">

// ❌ BAD: Inline styles
<div style={{ padding: '8px 16px', backgroundColor: '#gray' }}>
```

### 2. **Accessibility**
- **ALWAYS** include proper ARIA labels
- **ALWAYS** ensure keyboard navigation
- **ALWAYS** maintain 4.5:1 contrast ratio
- **NEVER** rely solely on color for information

### 3. **Performance**
- **ALWAYS** optimize images with next/image
- **LAZY LOAD** heavy components
- **USE** dynamic imports for large dependencies
- **IMPLEMENT** loading states for async operations

## 🗄️ Database Rules

### 1. **Schema Design**
```typescript
// ✅ GOOD: Consistent naming and types
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ❌ BAD: Inconsistent naming
export const Users = pgTable('Users', {
  ID: serial('ID'),
  Email: varchar('Email', { length: 255 }),
  created: timestamp('created'),
});
```

### 2. **Queries**
- **ALWAYS** use parameterized queries
- **NEVER** concatenate SQL strings
- **ALWAYS** handle errors gracefully
- **USE** transactions for related operations

### 3. **Migrations**
- **ALWAYS** test migrations locally first
- **NEVER** modify existing migrations
- **ALWAYS** provide rollback migrations
- **NAME** migrations descriptively: `001_create_users_table.sql`

## 🧪 Testing Rules

### 1. **Test Coverage**
- **MINIMUM** 70% code coverage
- **ALWAYS** test critical paths
- **FOCUS** on integration tests over unit tests
- **TEST** error scenarios

### 2. **Test Structure**
```typescript
// ✅ GOOD: Descriptive test names
describe('UserAuthentication', () => {
  it('should redirect unauthenticated users to login', async () => {
    // test implementation
  });

  it('should handle invalid credentials gracefully', async () => {
    // test implementation
  });
});

// ❌ BAD: Generic test names
test('test1', () => { ... });
test('works', () => { ... });
```

## 📦 Dependency Rules

### 1. **Package Management**
- **ALWAYS** use exact versions in package.json
- **AUDIT** dependencies regularly
- **MINIMIZE** bundle size
- **AVOID** deprecated packages

### 2. **Import Organization**
```typescript
// ✅ GOOD: Organized imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

import type { User } from '@/types';

// ❌ BAD: Mixed imports
import { Button } from '@/components/ui/button';
import React from 'react';
import type { User } from '@/types';
import { auth } from '@/lib/auth';
```

## 🚀 Performance Rules

### 1. **Bundle Size**
- **MAXIMUM** 200KB for initial JS bundle
- **USE** dynamic imports for features
- **ANALYZE** bundle regularly
- **TREE-SHAKE** unused code

### 2. **Runtime Performance**
- **TARGET** 95+ Lighthouse score
- **OPTIMIZE** Core Web Vitals
- **CACHE** expensive operations
- **DEBOUNCE** user input handlers

### 3. **Data Fetching**
```typescript
// ✅ GOOD: Parallel data fetching
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);

// ❌ BAD: Sequential fetching
const users = await fetchUsers();
const posts = await fetchPosts();
```

## 🔄 Git Rules

### 1. **Commit Messages**
```bash
# ✅ GOOD: Conventional commits
feat: add user authentication
fix: resolve memory leak in todo list
docs: update API documentation
perf: optimize image loading

# ❌ BAD: Unclear messages
update stuff
fix
changes
```

### 2. **Branch Strategy**
- **main** - Production-ready code
- **develop** - Integration branch
- **feature/** - New features
- **fix/** - Bug fixes
- **docs/** - Documentation

## 🚨 Error Handling Rules

### 1. **User-Facing Errors**
```typescript
// ✅ GOOD: Helpful error messages
try {
  await submitForm(data);
} catch (error) {
  toast.error('Failed to save changes. Please try again.');
  console.error('Form submission error:', error);
}

// ❌ BAD: Technical errors shown to users
catch (error) {
  alert(error.stack);
}
```

### 2. **Logging**
- **LOG** errors with context
- **NEVER** log sensitive data
- **USE** structured logging
- **IMPLEMENT** error boundaries

## 📱 Responsive Design Rules

### 1. **Breakpoints**
```css
/* Mobile First Approach */
/* Default: Mobile (< 640px) */
/* sm: 640px+ */
/* md: 768px+ */
/* lg: 1024px+ */
/* xl: 1280px+ */
/* 2xl: 1536px+ */
```

### 2. **Touch Targets**
- **MINIMUM** 44x44px for touch targets
- **SPACING** between interactive elements
- **HOVER** states only on non-touch devices

## 🌐 Internationalization Rules

### 1. **Text Content**
- **NEVER** hardcode text in components
- **ALWAYS** use translation keys
- **PREPARE** for RTL languages
- **FORMAT** dates/numbers by locale

### 2. **URL Structure**
- **USE** locale in URL: `/en/dashboard`, `/es/dashboard`
- **DEFAULT** to English
- **PERSIST** user preference

## ⚡ Caching Rules

### 1. **Static Assets**
- **CACHE** images for 1 year
- **CACHE** fonts for 1 year
- **VERSION** CSS/JS files
- **USE** CDN for static assets

### 2. **API Responses**
```typescript
// ✅ GOOD: Appropriate cache headers
return new Response(JSON.stringify(data), {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
  },
});
```

## 🔧 Development Workflow Rules

### 1. **Code Review**
- **REQUIRED** for all PRs
- **CHECK** for security issues
- **VERIFY** tests pass
- **ENSURE** documentation updated

### 2. **Deployment**
- **NEVER** deploy on Fridays
- **ALWAYS** test in staging first
- **MONITOR** after deployment
- **PREPARE** rollback plan

## 📊 Monitoring Rules

### 1. **Metrics to Track**
- Error rates
- Response times
- Database query performance
- Bundle size
- Core Web Vitals

### 2. **Alerting**
- **ALERT** on 5XX errors
- **ALERT** on performance degradation
- **ALERT** on high resource usage
- **NOTIFY** relevant team members

---

## 🎯 The Golden Rules

1. **Make it work, make it right, make it fast** - in that order
2. **Prefer clarity over cleverness**
3. **Write code for humans, not computers**
4. **Leave the codebase better than you found it**
5. **When in doubt, ask the team**

Remember: These rules exist to help us build better software together. They're guidelines, not dogma. Use your judgment, and when you find exceptions, document why.