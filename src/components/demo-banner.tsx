'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { shouldShowDemo, markDemoAsSeen } from '@/lib/demo-data';

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(shouldShowDemo());
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    markDemoAsSeen();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">
            🚀 You're viewing the ShipFast Template Demo
          </div>
          <div className="hidden sm:block text-xs opacity-90">
            This template includes authentication, real-time features, and modern UI components
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/shipfast/shipfast"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <Github size={12} />
            Get Template
          </a>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}