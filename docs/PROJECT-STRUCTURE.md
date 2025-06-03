# 📁 ShipFast Project Structure

This document outlines the complete project structure of the ShipFast template.

```
shipfast/
├── .github/                    # GitHub specific files
│   └── workflows/             # CI/CD workflows
│       └── ci.yml            # Main CI/CD pipeline
├── cli/                       # CLI tool (separate package)
│   ├── create-shipfast-app.js # CLI implementation
│   ├── package.json          # CLI package config
│   └── README.md             # CLI documentation
├── docs/                      # Additional documentation
│   ├── PROJECT-STRUCTURE.md  # This file
│   └── README.md             # Documentation overview
├── public/                    # Static assets
│   ├── images/               # Public images
│   └── favicon.ico           # Site favicon
├── scripts/                   # Setup and utility scripts
│   ├── setup-supabase.sh     # Supabase setup automation
│   ├── setup.sh              # General setup script
│   └── enhance.sh            # Enhancement script
├── src/
│   ├── app/                  # Next.js 15 app directory
│   │   ├── (auth)/          # Auth group routes
│   │   ├── (dashboard)/     # Protected routes
│   │   ├── api/             # API routes
│   │   │   ├── dev/         # Development-only APIs
│   │   │   ├── health/      # Health check
│   │   │   └── v1/          # API v1 endpoints
│   │   ├── setup/           # Setup wizard
│   │   └── [core pages]     # Main app pages
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components
│   │   ├── features/        # Feature-specific components
│   │   ├── layouts/         # Layout components
│   │   └── providers.tsx    # App providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Core libraries
│   │   ├── auth/           # Authentication logic
│   │   ├── db/             # Database/Drizzle ORM
│   │   ├── devtools/       # Developer tools
│   │   ├── supabase/       # Supabase client
│   │   ├── email/          # Email utilities
│   │   ├── env.ts          # Environment validation
│   │   ├── feature-flags.ts # Feature flags
│   │   └── utils.ts        # General utilities
│   ├── stores/              # State management (Zustand)
│   └── types/               # TypeScript types
├── supabase/                # Supabase specific files
│   ├── migrations/          # Database migrations
│   │   ├── 001_initial_schema.sql
│   │   └── 002_storage_setup.sql
│   └── config.toml          # Supabase config
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
│
├── .env.example            # Environment template
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guidelines
├── DESIGN-SYSTEM-2025.md  # Design system documentation
├── DEVELOPMENT-RULES.md   # Development guidelines
├── docker-compose.yml     # Docker compose config
├── Dockerfile             # Docker configuration
├── drizzle.config.ts      # Drizzle ORM config
├── jest.config.ts         # Jest configuration
├── jest.setup.ts          # Jest setup
├── LICENSE                # MIT License
├── next.config.ts         # Next.js configuration
├── package-lock.json      # Package lock file
├── package.json           # Package configuration
├── playwright.config.ts   # Playwright config
├── postcss.config.js      # PostCSS config
├── PROGRESS.md            # Implementation progress log
├── PROJECT-INVENTORY.md   # Complete feature inventory
├── README.md              # Main documentation
├── README-SUPABASE.md     # Supabase specific docs
├── tailwind.config.ts     # Tailwind configuration
├── TODO.md                # Remaining tasks & roadmap
├── tsconfig.json          # TypeScript config
└── vercel.json            # Vercel deployment config
```

## 📂 Key Directories Explained

### `/src/app/` - Next.js 15 App Directory
- Uses the new App Router structure
- Grouped routes for organization `(auth)`, `(dashboard)`
- API routes under `/api/` with versioning
- Server Components by default

### `/src/components/` - React Components
- `ui/` - Reusable base components (Button, Card, Input, etc.)
- `features/` - Feature-specific components (TodoList, ProfileForm)
- `layouts/` - Layout components for different sections

### `/src/lib/` - Core Libraries
- `auth/` - Authentication logic and session management
- `db/` - Database schema and queries using Drizzle ORM
- `devtools/` - Development tools (widget, command palette)
- `supabase/` - Supabase client configuration
- Core utilities like environment validation and feature flags

### `/supabase/` - Supabase Configuration
- Database migrations in SQL format
- Configuration for local development
- Storage bucket policies

### Documentation Files (Root Level)
- **README.md** - Main entry point for developers
- **PROJECT-INVENTORY.md** - Complete feature list
- **DEVELOPMENT-RULES.md** - Coding standards
- **TODO.md** - Task tracking and roadmap
- **PROGRESS.md** - Implementation history

## 🔧 Configuration Files

### Build & Development
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `drizzle.config.ts` - Database ORM configuration

### Testing
- `jest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration

### Code Quality
- `.eslintrc.json` - Linting rules
- `prettier.config.js` - Code formatting

### Deployment
- `Dockerfile` & `docker-compose.yml` - Container setup
- `vercel.json` - Vercel deployment settings
- `.github/workflows/ci.yml` - CI/CD pipeline

## 🎯 Best Practices

1. **Components** - Keep them small and focused
2. **API Routes** - Version your APIs (`/api/v1/`)
3. **Database** - Use migrations for schema changes
4. **Types** - Define TypeScript types in `/src/types/`
5. **Environment** - Never commit `.env` files
6. **Tests** - Co-locate with features when possible

This structure is designed for scalability, maintainability, and developer experience.