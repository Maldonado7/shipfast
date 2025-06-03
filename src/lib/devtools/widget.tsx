'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, Database, Zap, AlertTriangle, 
  ChevronUp, ChevronDown, X, Command
} from 'lucide-react';
import { useDevTools } from './provider';
import { cn } from '@/lib/utils';

export function DevToolsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'queries' | 'api' | 'errors'>('metrics');
  const { queries, apiCalls, errors } = useDevTools();
  
  // Performance metrics
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    renderTime: 0,
  });

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setMetrics((prev) => ({
          ...prev,
          fps: Math.round((frames * 1000) / (currentTime - lastTime)),
          memory: (performance as any).memory 
            ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) 
            : 0,
        }));
        frames = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const recentQueries = queries.slice(-5).reverse();
  const recentApiCalls = apiCalls.slice(-5).reverse();
  const recentErrors = errors.slice(-5).reverse();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          title="Open DevTools"
        >
          <Activity className="w-5 h-5" />
        </button>
      )}

      {/* DevTools Panel */}
      {isOpen && (
        <div className="bg-gray-900 text-white rounded-lg shadow-2xl w-96 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" />
              ShipFast DevTools
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-800 p-1 rounded"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('metrics')}
              className={cn(
                'flex-1 px-3 py-2 text-sm font-medium transition-colors',
                activeTab === 'metrics' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={cn(
                'flex-1 px-3 py-2 text-sm font-medium transition-colors',
                activeTab === 'queries' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Queries ({queries.length})
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={cn(
                'flex-1 px-3 py-2 text-sm font-medium transition-colors',
                activeTab === 'api' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:text-white'
              )}
            >
              API ({apiCalls.length})
            </button>
            <button
              onClick={() => setActiveTab('errors')}
              className={cn(
                'flex-1 px-3 py-2 text-sm font-medium transition-colors relative',
                activeTab === 'errors' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Errors
              {errors.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-3">
            {activeTab === 'metrics' && (
              <div className="space-y-3">
                <div className="bg-gray-800 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">FPS</span>
                    <span className="text-lg font-mono">{metrics.fps}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={cn(
                        'h-2 rounded-full transition-all',
                        metrics.fps >= 50 ? 'bg-green-500' : 
                        metrics.fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                      )}
                      style={{ width: `${Math.min(100, (metrics.fps / 60) * 100)}%` }}
                    />
                  </div>
                </div>

                {metrics.memory > 0 && (
                  <div className="bg-gray-800 rounded p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">Memory</span>
                      <span className="text-lg font-mono">{metrics.memory} MB</span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 text-center">
                  Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">⌘K</kbd> for commands
                </div>
              </div>
            )}

            {activeTab === 'queries' && (
              <div className="space-y-2">
                {recentQueries.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No queries yet</p>
                ) : (
                  recentQueries.map((query) => (
                    <div key={query.id} className="bg-gray-800 rounded p-2 text-xs">
                      <div className="font-mono text-gray-300 truncate">{query.sql}</div>
                      <div className="text-gray-500 mt-1">
                        {query.duration}ms • {new Date(query.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-2">
                {recentApiCalls.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No API calls yet</p>
                ) : (
                  recentApiCalls.map((call) => (
                    <div key={call.id} className="bg-gray-800 rounded p-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'font-semibold',
                          call.status >= 200 && call.status < 300 ? 'text-green-400' :
                          call.status >= 400 ? 'text-red-400' : 'text-yellow-400'
                        )}>
                          {call.method}
                        </span>
                        <span className="text-gray-300 truncate flex-1">{call.url}</span>
                      </div>
                      <div className="text-gray-500 mt-1">
                        {call.status} • {call.duration}ms • {new Date(call.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'errors' && (
              <div className="space-y-2">
                {recentErrors.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No errors</p>
                ) : (
                  recentErrors.map((error) => (
                    <div key={error.id} className="bg-red-900/20 border border-red-800/50 rounded p-2 text-xs">
                      <div className="text-red-400 font-medium">{error.message}</div>
                      {error.stack && (
                        <pre className="text-gray-400 mt-1 overflow-x-auto">{error.stack.split('\n')[1]}</pre>
                      )}
                      <div className="text-gray-500 mt-1">
                        {new Date(error.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}