import { z } from 'zod';

const isDevelopment = process.env.NODE_ENV === 'development';

const envSchema = z.object({
  // Supabase - relaxed for development
  NEXT_PUBLIC_SUPABASE_URL: isDevelopment 
    ? z.string().min(1)
    : z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  
  // Optional
  DATABASE_URL: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('ShipFast'),
  
  // Features
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
  NEXT_PUBLIC_ENABLE_CHAT: z.string().transform(val => val === 'true').default('false'),
  NEXT_PUBLIC_ENABLE_PAYMENTS: z.string().transform(val => val === 'true').default('false'),
});

export type Env = z.infer<typeof envSchema>;

// In development, provide defaults if env is missing
const getSafeEnv = () => {
  if (isDevelopment) {
    try {
      return envSchema.parse(process.env);
    } catch (error) {
      console.warn('Using default environment values for development');
      return {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key',
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: 'development' as const,
        NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
        NEXT_PUBLIC_APP_NAME: 'ShipFast',
        NEXT_PUBLIC_ENABLE_ANALYTICS: false,
        NEXT_PUBLIC_ENABLE_CHAT: false,
        NEXT_PUBLIC_ENABLE_PAYMENTS: false,
      };
    }
  }
  
  return envSchema.parse(process.env);
};

export const env = getSafeEnv();
