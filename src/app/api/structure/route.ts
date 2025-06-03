import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Directories and files to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.DS_Store',
  'coverage',
  '.env.local',
  '.env.production',
  '*.log',
  '.turbo',
  '.vercel',
  'out',
];

// File descriptions mapping
const FILE_DESCRIPTIONS: Record<string, string> = {
  'package.json': 'Project configuration and dependencies',
  'tsconfig.json': 'TypeScript configuration',
  'next.config.ts': 'Next.js configuration',
  '.env.example': 'Environment variables template',
  'README.md': 'Main project documentation',
  'CONTRIBUTING.md': 'Contribution guidelines',
  'LICENSE': 'MIT License',
  'TODO.md': 'Roadmap and future tasks',
  'CHANGELOG.md': 'Version history and releases',
  'PROJECT-SUMMARY.md': 'Complete project overview',
  'PROJECT-INVENTORY.md': 'Feature inventory and architecture',
  'PROGRESS.md': 'Implementation progress log',
  'DEVELOPMENT-RULES.md': 'Coding standards and best practices',
  'docker-compose.yml': 'Docker services configuration',
  'Dockerfile': 'Container build configuration',
  '.gitignore': 'Git ignore rules',
  'jest.config.ts': 'Jest testing configuration',
  'jest.setup.ts': 'Jest setup file',
  'tailwind.config.ts': 'Tailwind CSS configuration',
  'drizzle.config.ts': 'Database ORM configuration',
  'playwright.config.ts': 'E2E testing configuration',
  'postcss.config.js': 'PostCSS configuration',
  'vercel.json': 'Vercel deployment settings',
};

// Directory descriptions
const DIR_DESCRIPTIONS: Record<string, string> = {
  'src': 'Source code directory',
  'app': 'Next.js 15 App Router',
  'components': 'React components',
  'lib': 'Core libraries and utilities',
  'hooks': 'Custom React hooks',
  'types': 'TypeScript type definitions',
  'stores': 'State management (Zustand)',
  'ui': 'Base UI components',
  'features': 'Feature-specific components',
  'layouts': 'Layout components',
  'sections': 'Page sections',
  'navigation': 'Navigation components',
  'providers': 'React providers',
  'auth': 'Authentication logic',
  'db': 'Database queries and schema',
  'supabase': 'Supabase integration',
  'email': 'Email utilities',
  'api': 'API routes',
  'devtools': 'Development tools',
  'actions': 'Server actions',
  '(auth)': 'Auth group routes',
  '(dashboard)': 'Protected dashboard routes',
  'dev': 'Development-only APIs',
  'health': 'Health check endpoints',
  'v1': 'API version 1',
  'docs': 'API documentation',
  'git-status': 'Git status API',
  'dev-activity': 'Development activity API',
  'public': 'Static assets',
  'images': 'Image assets',
  'tests': 'Test files',
  'unit': 'Unit tests',
  'integration': 'Integration tests',
  'e2e': 'End-to-end tests',
  'scripts': 'Utility scripts',
  'cli': 'CLI tool package',
  'docs': 'Documentation files',
  '.github': 'GitHub configuration',
  'workflows': 'CI/CD pipelines',
  'supabase': 'Supabase configuration',
  'migrations': 'Database migrations',
  'layout': 'Layout-specific components',
  'todos': 'Todo feature components',
  'profile': 'Profile feature components',
};

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  description?: string;
  children?: FileNode[];
  size?: number;
  extension?: string;
}

async function shouldIgnore(name: string): Promise<boolean> {
  return IGNORE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(name);
    }
    return name === pattern;
  });
}

async function getFileStructure(dirPath: string, maxDepth: number = 5, currentDepth: number = 0): Promise<FileNode | null> {
  if (currentDepth > maxDepth) return null;

  try {
    const stats = await fs.stat(dirPath);
    const name = path.basename(dirPath);
    
    if (await shouldIgnore(name)) {
      return null;
    }

    if (stats.isDirectory()) {
      const children: FileNode[] = [];
      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const childPath = path.join(dirPath, item);
        const child = await getFileStructure(childPath, maxDepth, currentDepth + 1);
        if (child) {
          children.push(child);
        }
      }

      // Sort: directories first, then files, alphabetically
      children.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'directory' ? -1 : 1;
      });

      return {
        name,
        path: dirPath,
        type: 'directory',
        description: DIR_DESCRIPTIONS[name],
        children,
      };
    } else {
      const extension = path.extname(name).slice(1);
      return {
        name,
        path: dirPath,
        type: 'file',
        description: FILE_DESCRIPTIONS[name],
        size: stats.size,
        extension,
      };
    }
  } catch (error) {
    console.error(`Error reading ${dirPath}:`, error);
    return null;
  }
}

function generateMarkdownTree(node: FileNode, prefix: string = '', isLast: boolean = true, depth: number = 0): string {
  if (!node) return '';
  
  let result = '';
  const indent = depth === 0 ? '' : prefix + (isLast ? '└── ' : '├── ');
  const description = node.description ? ` # ${node.description}` : '';
  
  result += indent + node.name + description + '\n';
  
  if (node.children && node.children.length > 0) {
    const newPrefix = depth === 0 ? '' : prefix + (isLast ? '    ' : '│   ');
    node.children.forEach((child, index) => {
      const isLastChild = index === node.children!.length - 1;
      result += generateMarkdownTree(child, newPrefix, isLastChild, depth + 1);
    });
  }
  
  return result;
}

function calculateStats(node: FileNode): { files: number; folders: number; totalSize: number; extensions: Record<string, number> } {
  const stats = {
    files: 0,
    folders: 0,
    totalSize: 0,
    extensions: {} as Record<string, number>,
  };

  function traverse(n: FileNode) {
    if (n.type === 'directory') {
      stats.folders++;
      n.children?.forEach(traverse);
    } else {
      stats.files++;
      stats.totalSize += n.size || 0;
      if (n.extension) {
        stats.extensions[n.extension] = (stats.extensions[n.extension] || 0) + 1;
      }
    }
  }

  traverse(node);
  return stats;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const maxDepth = parseInt(searchParams.get('maxDepth') || '5', 10);
    
    // Get project root
    const projectRoot = path.join(process.cwd());
    
    // Generate file structure
    const structure = await getFileStructure(projectRoot, maxDepth);
    
    if (!structure) {
      return NextResponse.json({ error: 'Failed to read project structure' }, { status: 500 });
    }

    // Calculate statistics
    const stats = calculateStats(structure);

    // Return based on format
    switch (format) {
      case 'markdown':
        const markdown = generateMarkdownTree(structure);
        return new Response(markdown, {
          headers: { 'Content-Type': 'text/plain' },
        });
      
      case 'stats':
        return NextResponse.json({ stats });
      
      default:
        return NextResponse.json({
          structure,
          stats,
          generated: new Date().toISOString(),
        });
    }
  } catch (error) {
    console.error('Error generating structure:', error);
    return NextResponse.json(
      { error: 'Failed to generate project structure' },
      { status: 500 }
    );
  }
}

// For development: Generate static structure file
export async function POST(request: Request) {
  try {
    const projectRoot = path.join(process.cwd());
    const structure = await getFileStructure(projectRoot);
    
    if (!structure) {
      return NextResponse.json({ error: 'Failed to read project structure' }, { status: 500 });
    }

    // Save to public directory for static access
    const outputPath = path.join(process.cwd(), 'public', 'project-structure.json');
    await fs.writeFile(outputPath, JSON.stringify(structure, null, 2));

    // Also generate markdown version
    const markdown = generateMarkdownTree(structure);
    const mdPath = path.join(process.cwd(), 'PROJECT-STRUCTURE.md');
    await fs.writeFile(mdPath, `# Project Structure\n\nGenerated on: ${new Date().toISOString()}\n\n\`\`\`\n${markdown}\`\`\`\n`);

    return NextResponse.json({
      message: 'Structure files generated successfully',
      files: ['public/project-structure.json', 'PROJECT-STRUCTURE.md'],
    });
  } catch (error) {
    console.error('Error generating structure files:', error);
    return NextResponse.json(
      { error: 'Failed to generate structure files' },
      { status: 500 }
    );
  }
}