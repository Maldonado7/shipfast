# 🚀 ShipFast - Next.js 15 Full-Stack Template 2025

The most comprehensive, production-ready Next.js starter template. Built with TypeScript, Supabase, modern authentication, real-time features, and everything you need to ship fast.

> **📊 Status**: Production-Ready Template | **📖 Full Overview**: [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) | **🗂️ Structure**: [Interactive View](https://shipfast-template.vercel.app/structure) | **🎯 Demo**: [Live Preview](https://shipfast-template.vercel.app)

## 📋 Requirements

- Node.js 18.18.0 or higher (recommend v20 LTS)
- npm 8.0.0 or higher

## 🚀 Get Started in 2 Minutes

### Option 1: Use GitHub Template (Recommended)
1. Click **"Use this template"** on GitHub
2. Clone your new repository
3. Run the setup command:

```bash
npm install
npm run setup
```

### Option 2: CLI Installation
```bash
npx create-shipfast-app my-app
cd my-app
npm run setup
```

### Option 3: Manual Setup

1. **Clone and Install**
```bash
git clone https://github.com/Maldonado7/Template.git my-app
cd my-app
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env.local
# Update .env.local with your Supabase credentials
```

3. **Database Setup with Supabase**
```bash
# Option A: Use Supabase Cloud (Recommended)
# 1. Create account at https://supabase.com
# 2. Create new project
# 3. Copy URL and anon key to .env.local
# 4. Run migrations: npm run db:push

# Option B: Local Supabase
supabase start
npm run db:push
```

4. **Start Development Server**
```bash
npm run dev
```

That's it! Open http://localhost:3000 to see your app running.

## ⚡ What's Included

### 🏗️ Core Stack
- **Next.js 15** with App Router & Server Components
- **TypeScript** with strict configuration
- **Tailwind CSS** with custom design system
- **Supabase** for auth, database, storage & real-time
- **Drizzle ORM** for type-safe database operations

### 🔐 Authentication Ready
- Email/password authentication
- OAuth providers (Google, GitHub)
- Protected routes with middleware
- User profiles with avatar upload

### 🎨 Modern UI & Design
- 2025 design trends (Gaming UI, Brutalist, Y2K Revival)
- Dark mode support
- Responsive mobile-first design
- Micro-interactions and animations
- Complete component library

### 🛠️ Developer Experience
- **DevTools** with performance monitoring (Cmd+K)
- **Setup Wizard** for easy configuration
- **CLI tool** for project scaffolding
- **Interactive project structure** viewer
- **Feature flags** system
- Enhanced error boundaries

### 🚀 Production Ready
- Environment validation with Zod
- CI/CD pipeline with GitHub Actions
- Docker configuration
- SEO optimization
- Security headers & CORS
- Rate limiting
- Comprehensive testing setup

## 📁 Project Structure

```
my-app/
├── src/
│   ├── app/                    # App Router pages and layouts
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Protected routes
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   └── features/         # Feature-specific components
│   ├── lib/                   # Core libraries and utilities
│   │   ├── auth/             # Authentication logic
│   │   ├── db/               # Database configuration
│   │   └── actions/          # Server actions
│   ├── hooks/                 # Custom React hooks
│   ├── stores/                # Zustand stores
│   └── types/                 # TypeScript types
├── tests/                     # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── ...config files
```

## 🛠️ Built With

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Database

### Authentication & Security
- **Custom JWT Auth** - Secure session management
- **Data Access Layer** - Server-only data access
- **Security Headers** - XSS, CSRF protection
- **Input Validation** - Zod schema validation

### State Management & UI
- **Zustand** - Lightweight state management
- **Radix UI** - Accessible components
- **React Hook Form** - Form handling
- **Lucide Icons** - Icon system

### Testing & Quality
- **Jest** - Unit testing
- **Testing Library** - Component testing
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

### DevOps & Deployment
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Husky** - Git hooks
- **Turbopack** - Fast builds

## 🎯 Features

### Core Features
- ✅ **Authentication System** - Secure JWT-based auth with DAL pattern
- ✅ **Todo Application** - Full CRUD with priorities, due dates, and filtering
- ✅ **Real-time Updates** - Optimistic UI updates with server actions
- ✅ **Type Safety** - Full TypeScript coverage with strict mode
- ✅ **Performance** - Server Components, image optimization, code splitting

### Enhanced Features
- ✅ **Email Service** - Resend integration for welcome emails and notifications
- ✅ **API Rate Limiting** - Upstash Redis-based rate limiting with fallbacks
- ✅ **File Uploads** - UploadThing integration for secure file handling
- ✅ **API Documentation** - Interactive Swagger UI documentation
- ✅ **PWA Support** - Installable app with service workers
- ✅ **Security Headers** - CSP, HSTS, and comprehensive security headers
- ✅ **SEO Optimization** - Sitemap, robots.txt, structured data
- ✅ **Monitoring** - Sentry error tracking and analytics ready

### Developer Experience
- ✅ **One-command Setup** - Automated setup with `npm run setup`
- ✅ **Hot Reload** - Turbopack for lightning-fast development
- ✅ **Testing Suite** - Unit, integration, and E2E tests
- ✅ **Code Quality** - ESLint, Prettier, Husky git hooks
- ✅ **Documentation** - Comprehensive setup and API docs

### Production Ready
- ✅ **Docker Support** - Multi-stage Dockerfile and docker-compose
- ✅ **CI/CD Pipeline** - GitHub Actions with automated testing
- ✅ **Deployment Configs** - Vercel, Netlify, and generic deployment ready
- ✅ **Environment Management** - Separate configs for dev/staging/production
- ✅ **Health Checks** - Built-in health monitoring endpoints

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:db          # Start with database

# Building
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run typecheck       # Type checking

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:all        # Run all tests

# Database
npm run db:push         # Push schema changes
npm run db:seed         # Seed database
npm run db:studio       # Open Drizzle Studio
```

## 🔒 Environment Variables

Required variables for `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"

# Authentication
AUTH_SECRET="your-secret-key-here"

# Optional
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

## 📊 Default Accounts

After running `npm run db:seed`:

- **User Account**: test@example.com / password123
- **Admin Account**: admin@example.com / password123

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🐳 Docker Deployment

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Customization

### Adding New Features
1. Create database schema in `src/lib/db/schema.ts`
2. Add server actions in `src/lib/actions/`
3. Create components in `src/components/features/`
4. Add routes in `src/app/`

### Styling
- Modify `tailwind.config.ts` for theme changes
- Update CSS variables in `src/app/globals.css`
- Components use Tailwind classes with `cn()` utility

### Database
- Schema changes: Update `src/lib/db/schema.ts`
- Migrations: `npm run db:generate` and `npm run db:migrate`
- Seeding: Modify `src/lib/db/seed.ts`

## 📚 Documentation

### Key Patterns
- **Server Actions**: All data mutations use server actions
- **Data Access Layer**: Server-only data access with caching
- **Component Structure**: Separation of UI and feature components
- **Type Safety**: Strict TypeScript throughout

### Architecture Decisions
- App Router for modern React patterns
- Server Components for performance
- JWT sessions for authentication
- Zustand for client state
- Drizzle for type-safe database access

## 🚀 Deploy Your App

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Maldonado7/Template)

### Deploy to Netlify
```bash
npm run build
npx netlify deploy --prod --dir=.next
```

### Deploy with Docker
```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## 🤝 Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Maldonado7/Template/issues)
- **Discussions**: [Community discussions](https://github.com/Maldonado7/Template/discussions)
- **Discord**: [Join our Discord](https://discord.gg/shipfast) 
- **Twitter**: [@shipfast_dev](https://twitter.com/shipfast_dev)

## 📄 License

MIT License - feel free to use this template for personal and commercial projects.

## 🌟 Show Your Support

If ShipFast helped you build something awesome, please:
- ⭐ Star this repository
- 🐦 Share on Twitter
- 📝 Write a blog post about your experience

## 🔗 Learn More

- **[Full Documentation](./docs/README.md)** - Complete guides and tutorials
- **[API Reference](./docs/api-reference.md)** - Detailed API documentation  
- **[Deployment Guide](./docs/deployment.md)** - Production deployment guides
- **[Contributing](./CONTRIBUTING.md)** - How to contribute to ShipFast

---

**Ready to ship fast?** 🚀 [Get the template](https://github.com/Maldonado7/Template) and start building!