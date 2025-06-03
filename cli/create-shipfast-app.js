#!/usr/bin/env node

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

function logError(message) {
  console.error(`${COLORS.red}✖ ${message}${COLORS.reset}`);
}

function logSuccess(message) {
  console.log(`${COLORS.green}✓ ${message}${COLORS.reset}`);
}

function logInfo(message) {
  console.log(`${COLORS.blue}ℹ ${message}${COLORS.reset}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function validateProjectName(name) {
  const validNameRegex = /^[a-z0-9-]+$/;
  if (!validNameRegex.test(name)) {
    throw new Error('Project name must contain only lowercase letters, numbers, and hyphens');
  }
  
  const targetDir = path.resolve(process.cwd(), name);
  try {
    await fs.access(targetDir);
    throw new Error(`Directory ${name} already exists`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
  
  return targetDir;
}

async function promptForOptions() {
  const options = {
    projectName: '',
    features: {
      payments: false,
      analytics: false,
      chat: false,
    },
    database: 'supabase',
    deploy: 'vercel',
    packageManager: 'npm',
  };

  // Project name
  while (!options.projectName) {
    const name = await question(`${COLORS.cyan}Project name:${COLORS.reset} `);
    try {
      await validateProjectName(name);
      options.projectName = name;
    } catch (error) {
      logError(error.message);
    }
  }

  // Feature selection
  log('\n📦 Select features to include:', COLORS.bright);
  
  const paymentChoice = await question('  Include payments (Stripe)? (y/N) ');
  options.features.payments = paymentChoice.toLowerCase() === 'y';
  
  const analyticsChoice = await question('  Include analytics (Vercel)? (y/N) ');
  options.features.analytics = analyticsChoice.toLowerCase() === 'y';
  
  const chatChoice = await question('  Include real-time chat? (y/N) ');
  options.features.chat = chatChoice.toLowerCase() === 'y';

  // Package manager
  const pmChoice = await question(`\n${COLORS.cyan}Package manager (npm/yarn/pnpm):${COLORS.reset} [npm] `);
  if (['yarn', 'pnpm'].includes(pmChoice.toLowerCase())) {
    options.packageManager = pmChoice.toLowerCase();
  }

  return options;
}

async function cloneTemplate(projectPath, options) {
  logInfo('Cloning ShipFast template...');
  
  // In a real implementation, this would clone from a git repository
  // For now, we'll create the directory and note that files should be copied
  await fs.mkdir(projectPath, { recursive: true });
  
  // Create a template config file
  const configContent = `// ShipFast Configuration
export const shipfastConfig = {
  name: '${options.projectName}',
  features: {
    auth: {
      providers: ['email', 'google', 'github'],
    },
    payments: ${options.features.payments},
    analytics: ${options.features.analytics},
    chat: ${options.features.chat},
  },
  database: '${options.database}',
  deployment: '${options.deploy}',
};
`;

  await fs.writeFile(path.join(projectPath, 'shipfast.config.js'), configContent);
  logSuccess('Template files created');
}

async function updateEnvFile(projectPath, options) {
  logInfo('Creating environment variables file...');
  
  let envContent = `# ShipFast Environment Variables
# Created by create-shipfast-app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=${options.features.analytics}
NEXT_PUBLIC_ENABLE_CHAT=${options.features.chat}
NEXT_PUBLIC_ENABLE_PAYMENTS=${options.features.payments}
`;

  if (options.features.payments) {
    envContent += `
# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
`;
  }

  if (options.features.analytics) {
    envContent += `
# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
`;
  }

  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
  await fs.writeFile(path.join(projectPath, '.env.local'), envContent);
  
  logSuccess('Environment files created');
}

async function installDependencies(projectPath, packageManager) {
  logInfo(`Installing dependencies with ${packageManager}...`);
  
  const installCommands = {
    npm: 'npm install',
    yarn: 'yarn install',
    pnpm: 'pnpm install',
  };
  
  try {
    execSync(installCommands[packageManager], {
      cwd: projectPath,
      stdio: 'inherit',
    });
    logSuccess('Dependencies installed');
  } catch (error) {
    logError('Failed to install dependencies');
    logInfo(`You can install them manually by running: cd ${path.basename(projectPath)} && ${installCommands[packageManager]}`);
  }
}

async function main() {
  console.clear();
  
  log(`
 ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌
▐░▌          ▐░▌       ▐░▌     ▐░▌     ▐░▌       ▐░▌
▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀ 
          ▐░▌▐░▌       ▐░▌     ▐░▌     ▐░▌          
 ▄▄▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌ ▄▄▄▄█░█▄▄▄▄ ▐░▌          
▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌          
 ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀           
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ 
▐░▌          ▐░▌       ▐░▌▐░▌               ▐░▌     
▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     
▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌     
▐░▌          ▐░▌       ▐░▌          ▐░▌     ▐░▌     
▐░▌          ▐░▌       ▐░▌ ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌     
▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌     ▐░▌     
 ▀            ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀      
`, COLORS.cyan);
  
  log('Welcome to ShipFast! Let\'s create your new project.\n', COLORS.bright);
  
  try {
    const options = await promptForOptions();
    const projectPath = path.resolve(process.cwd(), options.projectName);
    
    log('\n🚀 Creating your ShipFast project...\n', COLORS.bright);
    
    await cloneTemplate(projectPath, options);
    await updateEnvFile(projectPath, options);
    
    // Note: In a real implementation, we would copy all template files here
    logInfo('Note: This is a demo CLI. In production, all template files would be copied.');
    
    log('\n✨ Your ShipFast project is ready!\n', COLORS.green + COLORS.bright);
    
    log('Next steps:', COLORS.bright);
    log(`  1. cd ${options.projectName}`);
    log('  2. Update your .env.local file with your API keys');
    log('  3. npm run setup (or visit /setup in your browser)');
    log('  4. npm run dev');
    
    log('\n📚 Resources:', COLORS.bright);
    log('  Documentation: https://shipfast.dev/docs');
    log('  Discord: https://discord.gg/shipfast');
    log('  GitHub: https://github.com/shipfast/shipfast\n');
    
  } catch (error) {
    logError(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  logError(`Unexpected error: ${error.message}`);
  process.exit(1);
});