'use client'

import { useEffect } from 'react'
import { AlertCircle, Home, RefreshCw, Bug } from 'lucide-react'
import { env } from '@/lib/env'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    if (env.NODE_ENV === 'production') {
      // TODO: Add Sentry or other error reporting service
      console.error('Global error:', error)
    }
  }, [error])

  const isDevelopment = env.NODE_ENV === 'development'

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <div className="w-full max-w-md space-y-8 text-center">
            {/* Error Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">Oops! Something went wrong</h1>
              <p className="text-lg text-muted-foreground">
                {isDevelopment 
                  ? error.message || 'An unexpected error occurred'
                  : 'We encountered an unexpected error. Please try again.'}
              </p>
              
              {/* Error Digest in Production */}
              {error.digest && !isDevelopment && (
                <p className="text-sm text-muted-foreground">
                  Error ID: <code className="rounded bg-muted px-1 py-0.5">{error.digest}</code>
                </p>
              )}
            </div>

            {/* Debug Information in Development */}
            {isDevelopment && (
              <details className="rounded-lg border bg-muted/50 p-4 text-left">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <Bug className="h-4 w-4" />
                  Debug Information
                </summary>
                <div className="mt-4 space-y-2">
                  <div>
                    <p className="text-sm font-medium">Error Type:</p>
                    <p className="text-sm text-muted-foreground">{error.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stack Trace:</p>
                    <pre className="mt-1 overflow-x-auto rounded bg-background p-2 text-xs">
                      {error.stack}
                    </pre>
                  </div>
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </div>

            {/* Support Information */}
            <p className="text-sm text-muted-foreground">
              If this problem persists, please contact{' '}
              <a href="mailto:support@example.com" className="underline hover:text-foreground">
                support
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}