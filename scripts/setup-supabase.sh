#!/bin/bash

echo "🚀 Setting up Supabase integration for Next.js Full-Stack Template..."

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

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    print_error "Supabase CLI is not installed."
    echo ""
    echo "Please install it first:"
    echo "npm install -g supabase"
    echo "or"
    echo "brew install supabase/tap/supabase"
    echo ""
    echo "Then run this script again."
    exit 1
fi

print_header "Supabase Setup"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    print_warning ".env.local not found. Creating from .env.example..."
    cp .env.example .env.local
fi

print_status "Checking Supabase configuration..."

# Check if required environment variables are set
if grep -q "your-project-ref" .env.local; then
    print_warning "Supabase environment variables need to be configured in .env.local"
    echo ""
    echo "Please update the following variables in .env.local:"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "- SUPABASE_SERVICE_ROLE_KEY"
    echo "- DATABASE_URL"
    echo ""
    echo "You can get these values from your Supabase project dashboard:"
    echo "https://app.supabase.com/project/[your-project]/settings/api"
    echo ""
    read -p "Have you updated the Supabase environment variables? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Please update the environment variables and run this script again."
        exit 1
    fi
fi

print_header "Supabase Local Development Setup"

print_status "Starting Supabase local development..."

# Initialize Supabase if not already done
if [ ! -f supabase/config.toml ]; then
    print_status "Initializing Supabase project..."
    supabase init
fi

# Start Supabase local development
print_status "Starting Supabase services..."
supabase start

# Wait for services to be ready
sleep 5

print_status "Running database migrations..."
supabase db reset

# Apply any additional migrations
if [ -d "supabase/migrations" ]; then
    print_status "Applying custom migrations..."
    supabase db push
fi

print_header "Database Schema Setup"

print_status "Pushing Drizzle schema to Supabase..."
npm run db:push

print_header "Next Steps"
echo ""
echo "🎉 Supabase integration setup complete!"
echo ""
echo "Local Supabase services are running:"
echo "- API URL: http://localhost:54321"
echo "- Studio: http://localhost:54323"
echo "- Inbucket (emails): http://localhost:54324"
echo ""
echo "Next steps:"
echo "1. 🔧 Configure OAuth providers (optional):"
echo "   - GitHub: https://supabase.com/docs/guides/auth/social-login/auth-github"
echo "   - Google: https://supabase.com/docs/guides/auth/social-login/auth-google"
echo ""
echo "2. 🚀 Start your Next.js development server:"
echo "   npm run dev"
echo ""
echo "3. 📱 Test the application:"
echo "   - Visit http://localhost:3000"
echo "   - Create an account and test todos"
echo "   - Upload an avatar in profile settings"
echo ""
echo "4. 🌐 For production deployment:"
echo "   - Create a Supabase project at https://app.supabase.com"
echo "   - Update .env.production.local with production credentials"
echo "   - Run migrations: supabase db push --linked"
echo ""
echo "🔗 Useful links:"
echo "- Supabase Docs: https://supabase.com/docs"
echo "- Local Studio: http://localhost:54323"
echo "- API Documentation: http://localhost:3000/docs"