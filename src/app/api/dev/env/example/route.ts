import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  // Only allow in development
  if (env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  const exampleEnv = `# ShipFast Environment Variables
# Generated from DevTools

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres.your-project:password@aws-0-region.pooler.supabase.com:6543/postgres

# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Optional)
EMAIL_FROM=noreply@example.com
RESEND_API_KEY=re_your_resend_api_key

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CHAT=false
NEXT_PUBLIC_ENABLE_PAYMENTS=false

# OAuth Providers (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Redis (Optional)
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token`;

  return new NextResponse(exampleEnv, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}