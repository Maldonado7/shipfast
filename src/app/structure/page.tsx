'use client';

import { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, ChevronDown, FileText, FileCode, Image, Package, Settings, GitBranch, Database, Lock, Download, Copy, RefreshCw } from 'lucide-react';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  description?: string;
  children?: FileNode[];
  size?: number;
  extension?: string;
}

interface Stats {
  files: number;
  folders: number;
  totalSize: number;
  extensions: Record<string, number>;
}

// File type to icon mapping
const getFileIcon = (name: string, extension?: string) => {
  const ext = extension || name.split('.').pop() || '';
  
  if (['ts', 'tsx', 'js', 'jsx'].includes(ext)) return FileCode;
  if (['md', 'mdx'].includes(ext)) return FileText;
  if (['json'].includes(ext)) return Settings;
  if (['yml', 'yaml'].includes(ext)) return GitBranch;
  if (['sql'].includes(ext)) return Database;
  if (name.includes('.env')) return Lock;
  if (['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(ext)) return Image;
  if (name.includes('package')) return Package;
  return File;
};

// Format file size
const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// File/Folder component
const FileTreeNode: React.FC<{ node: FileNode; level?: number; searchTerm?: string }> = ({ 
  node, 
  level = 0,
  searchTerm = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = hasChildren ? Folder : getFileIcon(node.name, node.extension);
  
  // Highlight search term
  const highlightedName = searchTerm ? (
    <span>
      {node.name.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? 
          <mark key={i} className="bg-yellow-300 dark:bg-yellow-600">{part}</mark> : 
          part
      )}
    </span>
  ) : node.name;
  
  // Color coding
  const getNodeColor = () => {
    if (hasChildren) return 'text-blue-500 dark:text-blue-400';
    const ext = node.extension || '';
    if (['ts', 'tsx'].includes(ext)) return 'text-cyan-500 dark:text-cyan-400';
    if (['js', 'jsx'].includes(ext)) return 'text-yellow-500 dark:text-yellow-400';
    if (['md', 'mdx'].includes(ext)) return 'text-green-500 dark:text-green-400';
    if (['json'].includes(ext)) return 'text-orange-500 dark:text-orange-400';
    if (node.name.includes('.env')) return 'text-red-500 dark:text-red-400';
    if (['css', 'scss'].includes(ext)) return 'text-purple-500 dark:text-purple-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer group ${getNodeColor()}`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <span className="text-gray-500 dark:text-gray-400 transition-transform duration-200">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        <Icon size={16} className="flex-shrink-0" />
        <span className="text-sm font-mono">{highlightedName}</span>
        {node.description && (
          <span className="text-xs text-gray-500 dark:text-gray-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            // {node.description}
          </span>
        )}
        {node.type === 'file' && node.size && (
          <span className="text-xs text-gray-400 dark:text-gray-600 ml-auto">
            {formatSize(node.size)}
          </span>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="ml-0">
          {node.children!.map((child, index) => (
            <FileTreeNode 
              key={`${child.path}-${index}`} 
              node={child} 
              level={level + 1}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ProjectStructurePage() {
  const [structure, setStructure] = useState<FileNode | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'stats'>('tree');
  const [searchTerm, setSearchTerm] = useState('');
  const [generating, setGenerating] = useState(false);

  // Fetch structure from API
  const fetchStructure = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/structure');
      if (!response.ok) throw new Error('Failed to fetch structure');
      const data = await response.json();
      setStructure(data.structure);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load structure');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStructure();
  }, []);

  // Generate static files
  const generateStaticFiles = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/structure', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to generate files');
      const data = await response.json();
      alert(`Generated: ${data.files.join(', ')}`);
    } catch (err) {
      alert('Failed to generate static files');
    } finally {
      setGenerating(false);
    }
  };

  // Export functions
  const exportAsJSON = () => {
    if (!structure) return;
    const blob = new Blob([JSON.stringify(structure, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shipfast-structure.json';
    a.click();
  };

  const exportAsMarkdown = async () => {
    try {
      const response = await fetch('/api/structure?format=markdown');
      const markdown = await response.text();
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shipfast-structure.md';
      a.click();
    } catch (err) {
      alert('Failed to export as markdown');
    }
  };

  const copyTree = async () => {
    try {
      const response = await fetch('/api/structure?format=markdown');
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  // Filter structure based on search
  const filterStructure = (node: FileNode, term: string): FileNode | null => {
    if (!term) return node;
    
    const nameMatches = node.name.toLowerCase().includes(term.toLowerCase());
    
    if (node.children) {
      const filteredChildren = node.children
        .map(child => filterStructure(child, term))
        .filter(Boolean) as FileNode[];
      
      if (filteredChildren.length > 0 || nameMatches) {
        return { ...node, children: filteredChildren };
      }
    } else if (nameMatches) {
      return node;
    }
    
    return null;
  };

  const filteredStructure = structure ? filterStructure(structure, searchTerm) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Scanning project structure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={fetchStructure}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ShipFast Project Structure</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Live filesystem visualization of the ShipFast template structure
        </p>
        {stats && (
          <p className="text-sm text-gray-500 mt-1">
            {stats.files} files, {stats.folders} folders, {formatSize(stats.totalSize)} total
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('tree')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'tree' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Tree View
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'stats' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={fetchStructure}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Refresh structure"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search files and folders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tree View */}
      {viewMode === 'tree' && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-6 overflow-x-auto">
          {filteredStructure ? (
            <FileTreeNode node={filteredStructure} searchTerm={searchTerm} />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No files found matching "{searchTerm}"
            </p>
          )}
        </div>
      )}

      {/* Stats View */}
      {viewMode === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Files:</span>
                <span className="font-bold text-lg text-blue-600">{stats.files}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Folders:</span>
                <span className="font-bold text-lg text-green-600">{stats.folders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Size:</span>
                <span className="font-bold text-lg text-purple-600">{formatSize(stats.totalSize)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">File Types:</span>
                <span className="font-bold text-lg text-orange-600">{Object.keys(stats.extensions).length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Top File Types</h3>
            <div className="space-y-2">
              {Object.entries(stats.extensions)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8)
                .map(([type, count]) => {
                  const Icon = getFileIcon('', type);
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-gray-500" />
                        <span className="text-sm">.{type}</span>
                      </div>
                      <span className="font-semibold">{count}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Project Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 dark:text-gray-400 block text-sm">Framework</span>
                <span className="font-semibold">Next.js 15</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 block text-sm">Language</span>
                <span className="font-semibold">TypeScript</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 block text-sm">Template</span>
                <span className="font-semibold">ShipFast</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 block text-sm">Last Scanned</span>
                <span className="font-semibold text-sm">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={exportAsJSON}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
        >
          <Download size={16} />
          Export JSON
        </button>
        <button 
          onClick={exportAsMarkdown}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
        >
          <FileText size={16} />
          Export Markdown
        </button>
        <button 
          onClick={copyTree}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
        >
          <Copy size={16} />
          Copy Tree
        </button>
        <button 
          onClick={generateStaticFiles}
          disabled={generating}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2 transition-colors"
        >
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating...
            </>
          ) : (
            <>
              <Package size={16} />
              Generate Static Files
            </>
          )}
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This structure is generated by scanning the actual filesystem in real-time.</p>
        <p>Use the refresh button to update after making changes to the project.</p>
      </div>
    </div>
  );
}