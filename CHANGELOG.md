# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features that are being worked on

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security vulnerability fixes

## [1.0.0] - 2025-01-06

### Added
- Initial release of ShipFast SaaS boilerplate
- Next.js 15 with App Router
- Supabase integration for authentication and database
- TypeScript support with strict type checking
- Tailwind CSS with custom design system
- Shadcn/ui components library
- Authentication system with email/password and OAuth providers
- User profile management with avatar upload
- Todo list feature with real-time updates
- Responsive navigation with mobile menu
- Dark mode support
- SEO optimization with metadata API
- API routes with OpenAPI documentation
- Rate limiting with Upstash Redis
- Email service integration with Resend
- Error handling with custom error pages
- Loading states and skeletons
- Form validation with React Hook Form and Zod
- Database schema with Drizzle ORM
- Docker support for local development
- E2E testing with Playwright
- Unit testing with Jest and React Testing Library
- CI/CD workflow with GitHub Actions
- Comprehensive documentation
- Environment variables configuration
- Security headers and CSP
- PWA support with web manifest
- Sitemap and robots.txt generation
- Health check endpoint
- Development scripts for setup and deployment

### Security
- Implemented secure authentication flow
- Added CSRF protection
- Configured security headers
- Implemented rate limiting for API endpoints
- Added input validation and sanitization

### Documentation
- Added comprehensive README
- Created contribution guidelines
- Added environment variables documentation
- Created design system documentation
- Added API documentation
- Created deployment guides

## [0.9.0-beta] - 2024-12-20

### Added
- Beta release for testing
- Core features implementation
- Basic authentication flow
- Database integration
- UI component library
- Basic documentation

### Changed
- Migrated from Pages Router to App Router
- Updated to Next.js 15
- Switched from Prisma to Drizzle ORM
- Improved TypeScript configuration

### Fixed
- Authentication redirect issues
- Database connection pooling
- Build optimization issues
- TypeScript type errors

## [0.5.0-alpha] - 2024-12-01

### Added
- Initial alpha release
- Basic project structure
- Next.js setup
- Tailwind CSS configuration
- Basic components
- Development environment setup

### Known Issues
- Authentication not fully implemented
- Limited browser support
- Performance optimizations needed
- Documentation incomplete

---

## Version History

- **1.0.0** - First stable release
- **0.9.0-beta** - Beta release
- **0.5.0-alpha** - Alpha release

## How to Update

To update to the latest version:

```bash
git pull origin main
pnpm install
pnpm db:push
pnpm build
```

Always check the migration guide when updating between major versions.

## Support

- Documentation: https://shipfast.dev/docs
- Issues: https://github.com/shipfast/shipfast/issues
- Discord: https://discord.gg/shipfast

[unreleased]: https://github.com/shipfast/shipfast/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/shipfast/shipfast/releases/tag/v1.0.0
[0.9.0-beta]: https://github.com/shipfast/shipfast/releases/tag/v0.9.0-beta
[0.5.0-alpha]: https://github.com/shipfast/shipfast/releases/tag/v0.5.0-alpha