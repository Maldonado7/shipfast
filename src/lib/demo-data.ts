/**
 * Demo data for the ShipFast template
 * This helps new users understand the features quickly
 */

export const demoTodos = [
  {
    title: "✨ Welcome to ShipFast Template!",
    completed: false,
    priority: "high" as const,
  },
  {
    title: "🔄 Check out the real-time sync",
    completed: false,
    priority: "medium" as const,
  },
  {
    title: "🎨 Explore the modern UI components",
    completed: false,
    priority: "medium" as const,
  },
  {
    title: "📁 View the interactive project structure",
    completed: false,
    priority: "low" as const,
  },
  {
    title: "🔐 Test the authentication flow",
    completed: true,
    priority: "high" as const,
  },
  {
    title: "🛠️ Try DevTools with Cmd+K (development)",
    completed: false,
    priority: "low" as const,
  },
  {
    title: "🚀 Start building your SaaS!",
    completed: false,
    priority: "high" as const,
  },
];

export const demoUser = {
  email: "demo@shipfast.dev",
  fullName: "Demo User",
  avatarUrl: null,
};

// Helper function to check if we should show demo content
export const shouldShowDemo = () => {
  if (typeof window === 'undefined') return false;
  
  // Show demo if localStorage flag is set or if it's the first visit
  const hasSeenDemo = localStorage.getItem('shipfast-demo-seen');
  return !hasSeenDemo;
};

// Mark demo as seen
export const markDemoAsSeen = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('shipfast-demo-seen', 'true');
};

// Reset demo state (useful for development)
export const resetDemo = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('shipfast-demo-seen');
};