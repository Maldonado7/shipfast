# create-shipfast-app

The official CLI for creating new ShipFast projects.

## Usage

```bash
npx create-shipfast-app
```

Or install globally:

```bash
npm install -g create-shipfast-app
create-shipfast-app
```

## Interactive Setup

The CLI will guide you through:

1. **Project Name** - Choose a name for your project
2. **Feature Selection** - Pick which features to include:
   - Payments (Stripe integration)
   - Analytics (Vercel Analytics)
   - Real-time Chat
3. **Package Manager** - Select npm, yarn, or pnpm

## Command Line Options

```bash
# Create with all features
npx create-shipfast-app my-app --all-features

# Create with specific features
npx create-shipfast-app my-app --payments --analytics

# Use a specific package manager
npx create-shipfast-app my-app --pm yarn

# Skip prompts and use defaults
npx create-shipfast-app my-app --yes
```

## What's Included

- ✅ Next.js 15 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup
- ✅ Supabase integration
- ✅ Authentication system
- ✅ Database with Drizzle ORM
- ✅ Testing setup (Jest + Playwright)
- ✅ ESLint & Prettier
- ✅ Git hooks with Husky
- ✅ Docker configuration
- ✅ CI/CD workflows

## After Installation

1. Navigate to your project:
   ```bash
   cd my-app
   ```

2. Update your environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. Run the setup wizard:
   ```bash
   npm run setup
   # Or visit http://localhost:3000/setup
   ```

4. Start developing:
   ```bash
   npm run dev
   ```

## Requirements

- Node.js 18.0 or higher
- Git installed
- A Supabase account (free tier works)

## License

MIT