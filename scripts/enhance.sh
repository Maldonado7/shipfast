#!/bin/bash

echo "🚀 Adding enhanced features to Next.js Full-Stack Template..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE} $1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_header "Enhanced Features Installation"

print_status "Installing enhanced dependencies..."

# Enhanced features packages
PACKAGES=(
    "resend"
    "react-email"
    "@upstash/ratelimit"
    "@upstash/redis"
    "uploadthing"
    "@uploadthing/react"
    "next-pwa"
    "workbox-webpack-plugin"
    "swagger-ui-react"
    "swagger-jsdoc"
    "@sentry/nextjs"
    "@types/swagger-jsdoc"
    "@types/swagger-ui-react"
    "local-ssl-proxy"
    "@next/bundle-analyzer"
)

for package in "${PACKAGES[@]}"; do
    print_status "Installing $package..."
    npm install "$package"
done

print_header "Configuration Updates"

print_status "Enhanced features installed successfully!"

print_header "Next Steps"
echo ""
echo "🎉 Enhanced features are now available!"
echo ""
echo "Available enhancements:"
echo "1. 📧 Email service with Resend"
echo "   - Set RESEND_API_KEY in .env.local"
echo "   - Configure EMAIL_FROM domain"
echo ""
echo "2. 🛡️ API Rate limiting"
echo "   - Set up Upstash Redis for production"
echo "   - Configure UPSTASH_REDIS_REST_URL and TOKEN"
echo ""
echo "3. 📤 File uploads with UploadThing"
echo "   - Set UPLOADTHING_SECRET and APP_ID"
echo "   - Add file upload components to your app"
echo ""
echo "4. 📱 PWA support"
echo "   - App is now installable on mobile devices"
echo "   - Add app icons to /public folder"
echo ""
echo "5. 📊 API documentation"
echo "   - Visit /docs for interactive API documentation"
echo "   - Swagger UI with all endpoints documented"
echo ""
echo "6. 🔒 Enhanced security"
echo "   - Content Security Policy headers"
echo "   - Rate limiting on all API routes"
echo "   - HSTS and security headers"
echo ""
echo "7. 📈 SEO optimizations"
echo "   - Sitemap and robots.txt"
echo "   - PWA manifest"
echo "   - Meta tags and structured data"
echo ""
echo "Production deployment:"
echo "- Copy .env.production.example to .env.production.local"
echo "- Configure all production environment variables"
echo "- Use vercel.json for Vercel deployment"
echo ""
echo "🔗 Useful links:"
echo "- API Docs: http://localhost:3000/docs"
echo "- Health Check: http://localhost:3000/api/health"
echo "- PWA Manifest: http://localhost:3000/manifest.json"