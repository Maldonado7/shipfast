import { env } from './env';

// Feature flags configuration
export const featureFlags = {
  // Core features
  auth: {
    email: true,
    oauth: {
      google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? true : false,
      github: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? true : false,
    },
    magicLink: false,
  },
  
  // Optional features
  payments: env.NEXT_PUBLIC_ENABLE_PAYMENTS,
  chat: env.NEXT_PUBLIC_ENABLE_CHAT,
  analytics: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
  
  // UI features
  ui: {
    darkMode: true,
    animations: true,
    customCursor: true,
    floatingElements: true,
    parallaxEffects: true,
  },
  
  // Development features
  dev: {
    debugMode: env.NODE_ENV === 'development',
    mockData: env.NODE_ENV === 'development',
    apiDocs: true,
  },
  
  // Experimental features
  experimental: {
    aiAssistant: false,
    advancedSearch: false,
    collaboration: false,
  },
} as const;

// Type-safe feature flag checking
export type FeatureFlags = typeof featureFlags;

// Helper function to check if a feature is enabled
export function isFeatureEnabled(feature: string): boolean {
  const parts = feature.split('.');
  let current: any = featureFlags;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return false;
    }
    current = current[part];
  }
  
  return current === true;
}

// React hook for feature flags
export function useFeatureFlag(feature: string): boolean {
  return isFeatureEnabled(feature);
}

// Feature flag component
export function FeatureFlag({ 
  feature, 
  children, 
  fallback = null 
}: { 
  feature: string; 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (!isFeatureEnabled(feature)) {
    return fallback;
  }
  
  return children;
}