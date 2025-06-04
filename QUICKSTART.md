# 🚀 ShipFast Quick Start Guide

Get your app running in **under 5 minutes**!

## Prerequisites

- Node.js 18+ (check with `node --version`)
- If needed: `nvm install 20 && nvm use 20`

## ⚡ Quick Setup (3 Steps)

```bash
# 1. Clone and enter the project
git clone https://github.com/yourusername/shipfast-template.git my-awesome-app
cd my-awesome-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

✨ **That's it!** Visit [http://localhost:3000](http://localhost:3000)

## 🎯 What You Get

- ✅ **Landing Page** - Beautiful, responsive homepage
- ✅ **Authentication** - Login/Register pages ready to go
- ✅ **Dashboard** - User dashboard with todos example
- ✅ **API Routes** - Health check, auth endpoints
- ✅ **Dark Mode** - Built-in theme switcher
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Utility-first styling

## 🔧 Optional: Configure Services

### Want Authentication? (Supabase)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your credentials to `.env.local`:

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Want a Database?

```bash
# If using Supabase
npm run db:push

# View your database
npm run db:studio
```

## 📁 Project Structure

```
my-awesome-app/
├── src/
│   ├── app/          # Next.js 15 app directory
│   ├── components/   # Reusable components
│   ├── lib/          # Utilities and configs
│   └── styles/       # Global styles
├── public/           # Static assets
└── tests/            # Test files
```

## 🎨 Start Building!

1. **Modify the homepage**: Edit `src/app/page.tsx`
2. **Add new pages**: Create files in `src/app/`
3. **Create API routes**: Add files to `src/app/api/`
4. **Use components**: Check `src/components/ui/`

## 🆘 Need Help?

- 📖 [Full Documentation](./README.md)
- 🐛 [Troubleshooting Guide](./TROUBLESHOOTING.md)
- 💬 [GitHub Issues](https://github.com/yourusername/shipfast-template/issues)

---

**Happy Shipping!** 🚢 Built with ❤️ using ShipFast Template