#!/bin/bash

echo "🚀 Setting up Next.js Full-Stack Template..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if .env.local exists
print_header "Environment Setup"

if [ ! -f .env.local ]; then
    print_status "Creating .env.local from template..."
    cp .env.example .env.local
    
    # Generate a secure AUTH_SECRET
    if command -v openssl &> /dev/null; then
        AUTH_SECRET=$(openssl rand -base64 32)
        print_status "Generated secure AUTH_SECRET"
        
        # Update .env.local with generated secret
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/your-auth-secret-here/$AUTH_SECRET/" .env.local
        else
            # Linux
            sed -i "s/your-auth-secret-here/$AUTH_SECRET/" .env.local
        fi
    else
        print_warning "OpenSSL not found. Please manually set AUTH_SECRET in .env.local"
    fi
else
    print_status ".env.local already exists"
fi

# Check if Node.js is installed and version
print_header "Prerequisites Check"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
    
    # Check if version is 20 or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ $MAJOR_VERSION -ge 20 ]; then
        print_status "Node.js version is sufficient"
    else
        print_error "Node.js version 20+ required. Current: $NODE_VERSION"
        exit 1
    fi
else
    print_error "Node.js not found. Please install Node.js 20+"
    exit 1
fi

# Check Docker
if command -v docker &> /dev/null; then
    print_status "Docker found"
else
    print_warning "Docker not found. Database setup may fail."
fi

# Install dependencies
print_header "Dependencies Installation"
print_status "Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Database setup
print_header "Database Setup"
print_status "Starting PostgreSQL with Docker..."

# Start database
docker-compose up -d db

if [ $? -eq 0 ]; then
    print_status "Database container started"
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 10
    
    # Push schema
    print_status "Pushing database schema..."
    npm run db:push
    
    if [ $? -eq 0 ]; then
        print_status "Schema pushed successfully"
        
        # Seed database
        print_status "Seeding database with test data..."
        npm run db:seed
        
        if [ $? -eq 0 ]; then
            print_status "Database seeded successfully"
        else
            print_warning "Failed to seed database"
        fi
    else
        print_warning "Failed to push schema"
    fi
else
    print_warning "Failed to start database container"
fi

# Final instructions
print_header "Setup Complete!"

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Start the development server:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo "2. Open your browser:"
echo -e "   ${BLUE}http://localhost:3000${NC}"
echo ""
echo "3. Test accounts (after seeding):"
echo -e "   User: ${YELLOW}test@example.com${NC} / ${YELLOW}password123${NC}"
echo -e "   Admin: ${YELLOW}admin@example.com${NC} / ${YELLOW}password123${NC}"
echo ""
echo "4. Health check:"
echo -e "   ${BLUE}http://localhost:3000/api/health${NC}"
echo ""
echo "🎉 Happy coding!"