'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Command } from 'cmdk';
import { 
  Database, Zap, Bug, Code2, Palette, Key, 
  RotateCw, Trash2, Download, Upload, Copy,
  Settings, FileText, Globe, Shield, Package
} from 'lucide-react';

interface DevCommand {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<any>;
  action: () => void | Promise<void>;
  category: 'database' | 'cache' | 'auth' | 'debug' | 'utils';
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands: DevCommand[] = [
    // Database Commands
    {
      id: 'db-migrate',
      label: 'Run Database Migrations',
      description: 'Apply pending database migrations',
      icon: Database,
      category: 'database',
      action: async () => {
        setLoading('db-migrate');
        await fetch('/api/dev/db/migrate', { method: 'POST' });
        setLoading(null);
      },
    },
    {
      id: 'db-seed',
      label: 'Seed Database',
      description: 'Populate database with sample data',
      icon: Database,
      category: 'database',
      action: async () => {
        setLoading('db-seed');
        await fetch('/api/dev/db/seed', { method: 'POST' });
        setLoading(null);
      },
    },
    {
      id: 'db-reset',
      label: 'Reset Database',
      description: 'Drop all tables and re-run migrations',
      icon: Trash2,
      category: 'database',
      action: async () => {
        if (confirm('Are you sure? This will delete all data!')) {
          setLoading('db-reset');
          await fetch('/api/dev/db/reset', { method: 'POST' });
          setLoading(null);
        }
      },
    },
    
    // Cache Commands
    {
      id: 'cache-clear',
      label: 'Clear All Caches',
      description: 'Clear Redis, browser, and CDN caches',
      icon: RotateCw,
      category: 'cache',
      action: async () => {
        setLoading('cache-clear');
        await fetch('/api/dev/cache/clear', { method: 'POST' });
        localStorage.clear();
        sessionStorage.clear();
        setLoading(null);
      },
    },
    
    // Auth Commands
    {
      id: 'auth-create-user',
      label: 'Create Test User',
      description: 'Create a test user account',
      icon: Key,
      category: 'auth',
      action: async () => {
        setLoading('auth-create-user');
        const res = await fetch('/api/dev/auth/create-test-user', { method: 'POST' });
        const data = await res.json();
        console.log('Test user created:', data);
        setLoading(null);
      },
    },
    {
      id: 'auth-clear-sessions',
      label: 'Clear All Sessions',
      description: 'Log out all users',
      icon: Shield,
      category: 'auth',
      action: async () => {
        setLoading('auth-clear-sessions');
        await fetch('/api/dev/auth/clear-sessions', { method: 'POST' });
        setLoading(null);
      },
    },
    
    // Debug Commands
    {
      id: 'debug-toggle-logs',
      label: 'Toggle Debug Logs',
      description: 'Enable/disable verbose logging',
      icon: Bug,
      category: 'debug',
      action: () => {
        const current = localStorage.getItem('debug') === 'true';
        localStorage.setItem('debug', (!current).toString());
        window.location.reload();
      },
    },
    {
      id: 'debug-export-state',
      label: 'Export App State',
      description: 'Download current application state',
      icon: Download,
      category: 'debug',
      action: async () => {
        const state = {
          localStorage: { ...localStorage },
          sessionStorage: { ...sessionStorage },
          cookies: document.cookie,
          timestamp: new Date().toISOString(),
        };
        
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `shipfast-state-${Date.now()}.json`;
        a.click();
      },
    },
    
    // Utility Commands
    {
      id: 'utils-copy-env',
      label: 'Copy Environment Variables',
      description: 'Copy .env.example to clipboard',
      icon: Copy,
      category: 'utils',
      action: async () => {
        const res = await fetch('/api/dev/env/example');
        const text = await res.text();
        await navigator.clipboard.writeText(text);
      },
    },
    {
      id: 'utils-open-docs',
      label: 'Open Documentation',
      description: 'Open ShipFast documentation',
      icon: FileText,
      category: 'utils',
      action: () => {
        window.open('/docs', '_blank');
      },
    },
    {
      id: 'utils-view-structure',
      label: 'View Project Structure',
      description: 'Interactive project structure visualizer',
      icon: Palette,
      category: 'utils',
      action: () => {
        window.open('/structure', '_blank');
      },
    },
  ];

  const runCommand = useCallback(async (command: DevCommand) => {
    setOpen(false);
    await command.action();
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Developer Command Palette"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 border-b border-gray-700 outline-none"
        />
        
        <Command.List className="max-h-96 overflow-y-auto p-2">
          <Command.Empty className="text-center py-8 text-gray-400">
            No results found.
          </Command.Empty>
          
          {Object.entries(
            commands.reduce((acc, cmd) => {
              if (!acc[cmd.category]) acc[cmd.category] = [];
              acc[cmd.category].push(cmd);
              return acc;
            }, {} as Record<string, DevCommand[]>)
          ).map(([category, categoryCommands]) => (
            <Command.Group
              key={category}
              heading={category.charAt(0).toUpperCase() + category.slice(1)}
              className="text-xs text-gray-400 uppercase px-2 py-1.5"
            >
              {categoryCommands.map((command) => (
                <Command.Item
                  key={command.id}
                  value={command.label}
                  onSelect={() => runCommand(command)}
                  className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-800 data-[selected]:bg-gray-800"
                >
                  <command.icon className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <div className="text-sm text-white">
                      {loading === command.id ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span>
                          Processing...
                        </span>
                      ) : (
                        command.label
                      )}
                    </div>
                    {command.description && (
                      <div className="text-xs text-gray-500">{command.description}</div>
                    )}
                  </div>
                  <kbd className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">
                    ⏎
                  </kbd>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
        
        <div className="border-t border-gray-700 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
          <span>Press ↑↓ to navigate</span>
          <span>Press ⌘K to open</span>
        </div>
      </div>
    </Command.Dialog>
  );
}