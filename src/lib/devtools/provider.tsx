'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { env } from '@/lib/env';

interface DevToolsContextValue {
  queries: QueryLog[];
  logQuery: (sql: string, duration: number) => void;
  apiCalls: ApiLog[];
  logApiCall: (method: string, url: string, duration: number, status: number) => void;
  errors: ErrorLog[];
  logError: (error: Error, context?: any) => void;
  clearLogs: () => void;
}

interface QueryLog {
  id: string;
  sql: string;
  duration: number;
  timestamp: Date;
}

interface ApiLog {
  id: string;
  method: string;
  url: string;
  duration: number;
  status: number;
  timestamp: Date;
}

interface ErrorLog {
  id: string;
  message: string;
  stack?: string;
  context?: any;
  timestamp: Date;
}

const DevToolsContext = createContext<DevToolsContextValue | null>(null);

export function DevToolsProvider({ children }: { children: React.ReactNode }) {
  const [queries, setQueries] = useState<QueryLog[]>([]);
  const [apiCalls, setApiCalls] = useState<ApiLog[]>([]);
  const [errors, setErrors] = useState<ErrorLog[]>([]);

  const logQuery = (sql: string, duration: number) => {
    setQueries((prev) => [
      ...prev.slice(-49), // Keep last 50 queries
      {
        id: `query-${Date.now()}`,
        sql,
        duration,
        timestamp: new Date(),
      },
    ]);
  };

  const logApiCall = (method: string, url: string, duration: number, status: number) => {
    setApiCalls((prev) => [
      ...prev.slice(-49), // Keep last 50 API calls
      {
        id: `api-${Date.now()}`,
        method,
        url,
        duration,
        status,
        timestamp: new Date(),
      },
    ]);
  };

  const logError = (error: Error, context?: any) => {
    setErrors((prev) => [
      ...prev.slice(-49), // Keep last 50 errors
      {
        id: `error-${Date.now()}`,
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date(),
      },
    ]);
  };

  const clearLogs = () => {
    setQueries([]);
    setApiCalls([]);
    setErrors([]);
  };

  // Global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logError(new Error(event.message), { source: 'window.onerror' });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logError(new Error(`Unhandled rejection: ${event.reason}`), { source: 'unhandledrejection' });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Only render in development
  if (env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <DevToolsContext.Provider
      value={{
        queries,
        logQuery,
        apiCalls,
        logApiCall,
        errors,
        logError,
        clearLogs,
      }}
    >
      {children}
    </DevToolsContext.Provider>
  );
}

export function useDevTools() {
  const context = useContext(DevToolsContext);
  if (!context) {
    throw new Error('useDevTools must be used within DevToolsProvider');
  }
  return context;
}

export function useQueryLogger() {
  const context = useContext(DevToolsContext);
  return context?.logQuery || (() => {});
}

export function useApiLogger() {
  const context = useContext(DevToolsContext);
  return context?.logApiCall || (() => {});
}

export function useErrorLogger() {
  const context = useContext(DevToolsContext);
  return context?.logError || (() => {});
}