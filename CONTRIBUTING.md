# Contributing to ShipFast

First off, thank you for considering contributing to ShipFast! It's people like you that make ShipFast such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe the exact steps which reproduce the problem** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs** if possible
- **Include your environment details** (OS, Node.js version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**
- **List some other applications where this enhancement exists** (if applicable)

### Pull Requests

Please follow these steps to have your contribution considered by the maintainers:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Prerequisites

- Node.js 20.x or later
- pnpm 8.x or later
- Docker (for local Supabase development)
- Git

### Setting Up Your Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/shipfast.git
   cd shipfast
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Copy environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Set up Supabase locally**
   ```bash
   pnpm supabase:start
   ```

5. **Run database migrations**
   ```bash
   pnpm db:push
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write meaningful commit messages
   - Follow the coding standards (see below)
   - Add tests for new functionality
   - Update documentation as needed

3. **Run tests and linting**
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

4. **Submit a pull request**
   - Push your branch to your fork
   - Open a pull request against the `main` branch
   - Fill out the pull request template
   - Wait for code review

### Coding Standards

#### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style (enforced by ESLint and Prettier)
- Use functional components and hooks for React
- Prefer composition over inheritance
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the design system defined in `DESIGN-SYSTEM-2025.md`
- Use CSS variables for custom properties
- Ensure responsive design for all screen sizes
- Test dark mode compatibility

#### Component Guidelines

- Keep components small and focused
- Use proper TypeScript types for props
- Export types separately from components
- Place components in appropriate directories:
  - `ui/` - Basic reusable UI components
  - `features/` - Feature-specific components
  - `layouts/` - Layout components
  - `sections/` - Page sections

#### Testing

- Write unit tests for utilities and hooks
- Write integration tests for API routes
- Write E2E tests for critical user flows
- Aim for meaningful test coverage, not 100%
- Use descriptive test names

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Performance improvement
- `test:` - Adding missing tests
- `chore:` - Changes to the build process or auxiliary tools

Examples:
```
feat: add stripe webhook handling
fix: resolve authentication redirect loop
docs: update installation instructions
style: format code with prettier
refactor: extract todo logic into custom hook
perf: optimize image loading with next/image
test: add unit tests for auth utilities
chore: update dependencies
```

### Project Structure

```
my-app/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── ui/          # Basic UI components
│   │   ├── features/    # Feature-specific components
│   │   ├── layouts/     # Layout components
│   │   └── sections/    # Page sections
│   ├── lib/             # Utilities and libraries
│   │   ├── actions/     # Server actions
│   │   ├── auth/        # Authentication utilities
│   │   ├── db/          # Database utilities
│   │   └── supabase/    # Supabase client
│   ├── hooks/           # Custom React hooks
│   ├── stores/          # Zustand stores
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles and tokens
├── public/              # Static assets
├── supabase/           # Supabase configuration
│   └── migrations/     # Database migrations
├── tests/              # Test files
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── e2e/          # End-to-end tests
└── scripts/           # Build and utility scripts
```

### Database Changes

When making database schema changes:

1. Create a new migration file in `supabase/migrations/`
2. Use descriptive names: `XXX_description.sql`
3. Include both up and down migrations when possible
4. Test migrations locally before submitting
5. Update TypeScript types in `src/types/`

### API Development

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement rate limiting for public endpoints
- Add OpenAPI/Swagger documentation
- Validate request data with Zod schemas
- Handle errors gracefully

### Security Considerations

- Never commit sensitive data
- Validate and sanitize all user inputs
- Use parameterized queries for database operations
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Keep dependencies up to date

## Getting Help

If you need help, you can:

- Check the [documentation](https://shipfast.dev/docs)
- Search [existing issues](https://github.com/shipfast/shipfast/issues)
- Join our [Discord community](https://discord.gg/shipfast)
- Ask questions in [GitHub Discussions](https://github.com/shipfast/shipfast/discussions)

## Recognition

Contributors will be recognized in the following ways:

- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Given credit in the documentation for feature additions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.