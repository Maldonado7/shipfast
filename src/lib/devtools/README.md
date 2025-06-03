# 🛠️ ShipFast DevTools

A comprehensive development toolkit for debugging, monitoring, and optimizing your ShipFast applications.

## Features

### 1. 📊 Floating Widget
A real-time metrics dashboard that shows:
- **FPS Monitor**: Track frame rate performance
- **Memory Usage**: Monitor JavaScript heap size
- **Database Queries**: View recent SQL queries with execution time
- **API Calls**: Track API requests and response times
- **Error Tracking**: Catch and display runtime errors

### 2. ⌘ Command Palette (Cmd/Ctrl + K)
Quick access to developer commands:

#### Database Commands
- **Run Migrations**: Apply pending database migrations
- **Seed Database**: Populate with sample data
- **Reset Database**: Drop all tables and rebuild

#### Cache Commands
- **Clear All Caches**: Clear Redis, browser, and CDN caches

#### Auth Commands
- **Create Test User**: Generate a test user account
- **Clear All Sessions**: Log out all users

#### Debug Commands
- **Toggle Debug Logs**: Enable/disable verbose logging
- **Export App State**: Download current application state

#### Utility Commands
- **Copy Environment Variables**: Copy .env.example template
- **Open Documentation**: Quick access to docs

## Usage

### Installation
DevTools is automatically included in development mode. No additional setup required!

### Accessing DevTools

1. **Floating Widget**: Click the activity icon in the bottom-right corner
2. **Command Palette**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)

### Integration in Your Code

#### Log Database Queries
```typescript
import { useQueryLogger } from '@/lib/devtools/provider';

const logQuery = useQueryLogger();
logQuery('SELECT * FROM users', 125); // SQL and duration in ms
```

#### Log API Calls
```typescript
import { useApiLogger } from '@/lib/devtools/provider';

const logApi = useApiLogger();
logApi('GET', '/api/users', 230, 200); // method, url, duration, status
```

#### Log Errors
```typescript
import { useErrorLogger } from '@/lib/devtools/provider';

const logError = useErrorLogger();
logError(new Error('Something went wrong'), { context: 'user-action' });
```

#### Wrap API Routes
```typescript
import { withDevTools } from '@/lib/devtools/api-wrapper';

export const GET = withDevTools(async (request) => {
  // Your API logic here
  return NextResponse.json({ data });
});
```

## API Routes

All dev API routes are protected and only work in development mode:

- `POST /api/dev/db/migrate` - Run database migrations
- `POST /api/dev/db/seed` - Seed database
- `POST /api/dev/db/reset` - Reset database
- `POST /api/dev/cache/clear` - Clear all caches
- `POST /api/dev/auth/create-test-user` - Create test user
- `POST /api/dev/auth/clear-sessions` - Clear all sessions
- `GET /api/dev/env/example` - Get .env.example content

## Components

### DevToolsProvider
Wraps your app and provides context for logging and metrics.

### DevToolsWidget
The floating metrics panel that displays real-time information.

### CommandPalette
The command interface for quick developer actions.

## Performance Impact

DevTools only runs in development mode and has minimal performance impact:
- Stores only the last 50 items per category
- Uses requestAnimationFrame for FPS monitoring
- Automatically disabled in production builds

## Customization

### Adding New Commands

Edit `command-palette.tsx` to add new commands:

```typescript
const commands: DevCommand[] = [
  {
    id: 'my-command',
    label: 'My Custom Command',
    description: 'Description of what it does',
    icon: MyIcon,
    category: 'utils',
    action: async () => {
      // Your command logic
    },
  },
  // ... other commands
];
```

### Styling

DevTools uses Tailwind CSS classes. Modify the className props to customize appearance.

## Security

- All dev endpoints check for `NODE_ENV === 'development'`
- Returns 403 Forbidden in production
- No sensitive data is exposed

## Troubleshooting

### DevTools not showing
1. Ensure you're running in development mode
2. Check that DevTools is wrapped around your app in `layout.tsx`
3. Clear browser cache and reload

### Commands not working
1. Check browser console for errors
2. Ensure API routes are properly configured
3. Verify you're running the dev server

## Future Enhancements

- [ ] Network request waterfall
- [ ] Component render tracking
- [ ] Performance profiling
- [ ] State time-travel debugging
- [ ] Browser extension
- [ ] Export/import application state
- [ ] Custom metric tracking
- [ ] WebSocket debugging

---

Built with ❤️ for the ShipFast developer experience.