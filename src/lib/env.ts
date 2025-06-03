import { z } from 'zod';

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  
  // Database
  DATABASE_URL: z.string().url().optional(),
  
  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  
  // Email (optional)
  EMAIL_FROM: z.string().email().optional(),
  RESEND_API_KEY: z.string().optional(),
  
  // Feature flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
  NEXT_PUBLIC_ENABLE_CHAT: z.string().transform(val => val === 'true').default('false'),
  NEXT_PUBLIC_ENABLE_PAYMENTS: z.string().transform(val => val === 'true').default('false'),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const errorMessage = error.errors
      .map(err => `${err.path.join('.')}: ${err.message}`)
      .join('\n');
    
    throw new Error(`Environment validation failed:\n${errorMessage}`);
  }
  throw error;
}

export { env };

// Type-safe environment variable access
export const getEnv = () => env;