# 🔧 Troubleshooting Guide

Common issues and their solutions.

## 🚨 Installation Issues

### npm install fails with peer dependency errors

**Solution**: Use legacy peer deps flag
```bash
npm install --legacy-peer-deps
```

Or create `.npmrc` file:
```bash
echo "legacy-peer-deps=true" > .npmrc
npm install
```

### Module not found errors

**Common missing modules and fixes**:
```bash
# Missing Framer Motion
npm install framer-motion

# Missing Tailwind Animate
npm install tailwindcss-animate

# Missing Command Palette
npm install cmdk

# Missing Geist Font
npm install geist
```

## 🔑 Environment & Authentication Issues

### "Invalid Supabase credentials" error

**Solution**: Check your `.env.local` file
```bash
# 1. Make sure you copied the example
cp .env.example .env.local

# 2. For development without Supabase, use dummy values:
NEXT_PUBLIC_SUPABASE_URL=https://dummy-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy-key-for-testing
```

### Login/Register pages show errors

**Issue**: `useFormState` is deprecated in React 18

**Solution**: Already fixed in template, but if you see it:
```typescript
// OLD (Wrong)
import { useFormState } from 'react-dom'

// NEW (Correct)
import { useActionState } from 'react'
```

## 🎨 Styling Issues

### Styles not loading / Tailwind not working

**Solution**: Check PostCSS config
```javascript
// postcss.config.js should be:
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Dark mode not working

**Solution**: Check ThemeProvider in layout
```typescript
// src/app/layout.tsx should wrap children with:
<Providers>{children}</Providers>
```

## 🚀 Development Server Issues

### Port 3000 already in use

**Solution**: Kill the process or use different port
```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Hot reload not working

**Solution**: Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

## 📦 Build Issues

### Build fails with type errors

**Solution**: 
1. Check TypeScript errors:
```bash
npm run typecheck
```

2. Temporarily skip type checking:
```javascript
// next.config.ts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Only for emergency!
  },
}
```

### Build size too large

**Solution**: Check for accidentally included dependencies
```bash
# Analyze bundle
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

## 🐛 Runtime Issues

### API routes return 404

**Solution**: Check route file naming
- ✅ Correct: `src/app/api/todos/route.ts`
- ❌ Wrong: `src/app/api/todos.ts`

### Middleware not running

**Solution**: Check middleware location
- Must be at: `src/middleware.ts` (not in app directory)

## 💾 Database Issues

### Drizzle migration fails

**Solution**: Check DATABASE_URL in `.env.local`
```bash
# For Supabase
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres

# For local development without DB
# Comment out database features temporarily
```

## 🆘 Still Having Issues?

### Quick Fixes Script

Run our comprehensive fix script:
```bash
curl -s https://raw.githubusercontent.com/yourusername/shipfast-template/main/fix-all-template-issues.sh | bash
```

### Manual Reset

```bash
# Complete reset
rm -rf node_modules .next package-lock.json
npm install --legacy-peer-deps
npm run dev
```

### Get Help

1. Check existing issues: [GitHub Issues](https://github.com/yourusername/shipfast-template/issues)
2. Create new issue with:
   - Error message
   - Node version: `node --version`
   - OS: Mac/Windows/Linux
   - Steps to reproduce

---

**Remember**: Most issues are dependency-related. When in doubt, delete `node_modules` and reinstall! 🎯