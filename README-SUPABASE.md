# Next.js 15 Full-Stack Template with Supabase Integration

A production-ready, performance-optimized Next.js template with TypeScript, Supabase authentication, real-time features, file storage, and enterprise-grade tooling.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Supabase CLI (`npm install -g supabase`)
- Git

### Setup Instructions

#### Option 1: Supabase Integration Setup (Recommended)
```bash
git clone <repository-url> my-app
cd my-app
npm install
chmod +x scripts/setup-supabase.sh
./scripts/setup-supabase.sh
```

#### Option 2: Manual Supabase Setup

1. **Clone and Install**
```bash
git clone <repository-url> my-app
cd my-app
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
# Update Supabase environment variables in .env.local
```

3. **Supabase Configuration**
Create a Supabase project at https://app.supabase.com and update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
DATABASE_URL="postgresql://postgres.your-project-ref:password@aws-0-region.pooler.supabase.com:6543/postgres"
```

4. **Database Setup**
```bash
# Initialize and start Supabase locally
supabase init
supabase start

# Run migrations
supabase db reset
npm run db:push
```

5. **Start Development Server**
```bash
npm run dev
```

6. **Verify Setup**
- Open http://localhost:3000
- Supabase Studio: http://localhost:54323
- API docs: http://localhost:3000/docs
- Create account and test real-time todos
- Upload avatar in profile settings

## 🛠️ Built With

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript 5.6** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Drizzle ORM** - Type-safe database operations
- **Supabase** - Complete backend platform

### Authentication & Security
- **Supabase Auth** - Complete authentication solution
- **Row Level Security** - Database-level security policies
- **OAuth Providers** - GitHub, Google social login
- **Real-time Subscriptions** - Live data updates
- **File Storage** - Secure avatar uploads with Supabase Storage
- **Security Headers** - XSS, CSRF protection
- **Input Validation** - Zod schema validation

### State Management & UI
- **Zustand** - Lightweight state management
- **Radix UI** - Accessible components
- **React Hook Form** - Form handling
- **Lucide Icons** - Icon system

### Real-time Features
- **Live Todo Updates** - Real-time synchronization across devices
- **Instant UI Updates** - Optimistic updates with server sync
- **Multi-user Support** - Collaborative features ready

## 🎯 Features

### Core Features
- ✅ **Supabase Authentication** - Email/password and OAuth providers
- ✅ **Real-time Todo Application** - Live CRUD with priorities and due dates
- ✅ **User Profiles** - Avatar uploads and profile management
- ✅ **Row Level Security** - Secure data access at database level
- ✅ **Type Safety** - Full TypeScript coverage with Supabase types
- ✅ **Performance** - Server Components, real-time subscriptions

### Enhanced Features
- ✅ **File Storage** - Supabase Storage for avatars with RLS policies
- ✅ **Real-time Subscriptions** - Live data updates across all clients
- ✅ **Email Service** - Resend integration for notifications
- ✅ **API Rate Limiting** - Upstash Redis-based rate limiting
- ✅ **API Documentation** - Interactive Swagger UI documentation
- ✅ **PWA Support** - Installable app with service workers
- ✅ **Security Headers** - CSP updated for Supabase domains
- ✅ **SEO Optimization** - Sitemap, robots.txt, structured data

### Supabase Features
- ✅ **Database Migrations** - Automated schema setup with RLS
- ✅ **Auth Triggers** - Automatic user profile creation
- ✅ **Storage Policies** - Secure file upload permissions
- ✅ **Real-time Database** - Live data synchronization
- ✅ **Edge Functions Ready** - Prepared for Supabase Edge Functions

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:supabase     # Start with Supabase local stack

# Supabase
supabase start          # Start local Supabase stack
supabase studio         # Open Supabase Studio
supabase stop           # Stop local services

# Building
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Push Drizzle schema to Supabase
supabase db reset       # Reset and apply all migrations
supabase migration new  # Create new migration
```

## 🔒 Environment Variables

Required variables for `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres.your-project-ref:password@aws-0-region.pooler.supabase.com:6543/postgres"

# Optional: OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Enhanced Features
RESEND_API_KEY="re_your_resend_api_key"
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_redis_token"
```

## 📊 Database Schema

### Tables
- **`user_profiles`** - Extended user information linked to Supabase Auth
- **`todos`** - Todo items with real-time updates
- **`posts`** - Blog posts (example table)

### Storage Buckets
- **`avatars`** - User profile pictures with RLS policies

### RLS Policies
- Users can only access their own data
- Automatic user profile creation on signup
- Secure file upload permissions

## 🌐 Deployment

### Supabase Production Setup

1. **Create Production Project**
```bash
# Create new Supabase project
# Update .env.production.local with production credentials
```

2. **Run Migrations**
```bash
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

3. **Configure OAuth Providers**
- GitHub: Add redirect URL `https://yourdomain.com/auth/callback`
- Google: Configure OAuth consent screen and redirect URLs

4. **Deploy to Vercel/Netlify**
```bash
# Set environment variables in deployment platform
# Deploy with automatic builds
```

## 🔧 Customization

### Adding New Real-time Features
1. Update database schema in `src/lib/db/schema.ts`
2. Create RLS policies in migration files
3. Add real-time subscription hooks in `src/hooks/`
4. Implement server actions with Supabase client

### Configuring OAuth Providers
1. Set up OAuth apps in provider dashboards
2. Add credentials to Supabase Auth settings
3. Update environment variables
4. Configure redirect URLs

### File Storage Setup
1. Create new storage buckets in Supabase
2. Set up RLS policies for secure access
3. Add upload components using Supabase Storage client

## 📚 Documentation

### Key Patterns
- **Server Actions** - All data mutations use Supabase client
- **Real-time Hooks** - Custom hooks for live data subscriptions
- **RLS Security** - Database-level security for all tables
- **Type Safety** - Supabase-generated types for full type coverage

### Architecture Decisions
- Supabase for complete backend functionality
- Drizzle ORM for type-safe database access
- Real-time subscriptions for live features
- Row Level Security for data protection
- File storage with secure policies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with Supabase best practices
4. Add tests including real-time functionality
5. Run quality checks: `npm run test:all`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Real-time Features Guide](https://supabase.com/docs/guides/realtime)
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [Storage Guide](https://supabase.com/docs/guides/storage)

---

Built with ❤️ using Next.js 15, Supabase, and modern web technologies.