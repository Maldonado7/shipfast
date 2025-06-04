# 📦 How to Save Your ShipFast Template

Follow these steps to save your template and make it available for others.

## 1️⃣ Clean Up Your Template

```bash
# Remove any personal/sensitive data
rm -rf .env.local .env
rm -rf .next node_modules
rm -rf .DS_Store **/.DS_Store

# Clean up any test/temporary files
find . -name "*.log" -type f -delete
find . -name "*.tmp" -type f -delete
find . -name "*.backup" -type f -delete

# Reset git history (optional - for clean template)
rm -rf .git
git init
```

## 2️⃣ Commit Your Changes

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "🚀 ShipFast Template v1.0.3 - Production Ready

✨ Features:
- Next.js 15 with App Router
- React 18 with latest hooks
- Full authentication system
- Supabase integration
- Modern UI components
- Real-time features
- TypeScript + Tailwind CSS
- Developer tools

🐛 Fixes:
- All dependency issues resolved
- React 18 compatibility (useActionState)
- Environment validation
- Safe middleware
- Simplified docs page

📚 Includes:
- QUICKSTART.md for 5-minute setup
- TROUBLESHOOTING.md for common issues
- Comprehensive documentation
- One-command fix script"
```

## 3️⃣ Create a GitHub Repository

### Option A: GitHub Web Interface
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `shipfast-template` (or your preferred name)
3. Description: "🚀 Production-ready Next.js 15 starter template - Ship Fast, Ship Now!"
4. Make it **Public**
5. DON'T initialize with README (you already have one)
6. Click "Create repository"

### Option B: GitHub CLI
```bash
# Install GitHub CLI if needed
# brew install gh (Mac) or see: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository
gh repo create shipfast-template --public --description "🚀 Production-ready Next.js 15 starter template - Ship Fast, Ship Now!"
```

## 4️⃣ Push Your Template

```bash
# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/shipfast-template.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 5️⃣ Create a Template Repository

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Check ✅ **Template repository** option
4. This allows others to use "Use this template" button

## 6️⃣ Add Important Files

### Create `.github/FUNDING.yml` (optional)
```yaml
github: [YOUR_USERNAME]
custom: ["https://buymeacoffee.com/YOUR_USERNAME"]
```

### Update Repository Settings
1. Go to Settings → General
2. Features: Enable Issues, Discussions
3. Add topics: `nextjs`, `template`, `react`, `typescript`, `tailwindcss`, `supabase`

## 7️⃣ Create Release & Tag

```bash
# Create a version tag
git tag -a v1.0.3 -m "Initial stable release - All issues fixed"
git push origin v1.0.3

# Or create release on GitHub
gh release create v1.0.3 --title "ShipFast Template v1.0.3" --notes "
🎉 First stable release!

✅ What's Working:
- 5-minute setup from clone to running app
- All dependencies properly configured
- Authentication with React 18 hooks
- Supabase integration (optional)
- Modern UI components
- Full TypeScript support

📚 Documentation:
- QUICKSTART.md - Get started in 5 minutes
- TROUBLESHOOTING.md - Common issues & fixes
- Comprehensive README

🚀 Ready for production use!
"
```

## 8️⃣ Test Your Template

```bash
# Test that others can use your template
cd /tmp
git clone https://github.com/YOUR_USERNAME/shipfast-template.git test-template
cd test-template
npm install
npm run dev

# Should work immediately!
```

## 9️⃣ Create Template Usage Instructions

Add to your README.md:

```markdown
## 🚀 Using This Template

### Option 1: Use GitHub Template
1. Click "Use this template" button above
2. Name your new repository
3. Clone your new repo and start building!

### Option 2: Clone Directly
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/shipfast-template.git my-app
cd my-app
npm install
npm run dev
\`\`\`

### Option 3: Use npx (if you publish to npm)
\`\`\`bash
npx create-shipfast-app my-app
cd my-app
npm run dev
\`\`\`
```

## 🎯 Optional: Publish to NPM

### Create NPM Package
```bash
# In your cli/ directory
cd cli
npm init -y
npm publish create-shipfast-app
```

### Update package.json
```json
{
  "name": "create-shipfast-app",
  "version": "1.0.3",
  "description": "Create a new ShipFast app",
  "bin": {
    "create-shipfast-app": "./create-shipfast-app.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/shipfast-template.git"
  }
}
```

## ✅ Checklist Before Publishing

- [ ] Remove all `.env.local` files
- [ ] Remove `node_modules` and `.next`
- [ ] Update all URLs to use YOUR_USERNAME
- [ ] Test fresh clone works
- [ ] Update README with your info
- [ ] Add LICENSE file
- [ ] Tag with version
- [ ] Create GitHub release

## 🎉 Success!

Your template is now ready for the world! Share it:

```markdown
🚀 Check out my new Next.js starter template!

✨ Features:
- 5-minute setup
- Next.js 15 + React 18
- Full authentication
- Modern UI components
- Production ready

👉 github.com/YOUR_USERNAME/shipfast-template

#nextjs #react #webdev #opensource
```

## 📈 Maintain Your Template

1. **Watch for issues** - Respond to user questions
2. **Keep dependencies updated** - Monthly updates
3. **Add features** - Based on user feedback
4. **Create examples** - Show what can be built
5. **Build community** - Discord, discussions

---

**Congratulations!** You've created an amazing template that will help developers ship faster! 🎊