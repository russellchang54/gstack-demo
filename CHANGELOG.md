# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.0.1.0] - 2026-04-05

### Fixed
- Add proxy support for Google OAuth via global-agent — fixes OAuth timeout when accessing Google through corporate/firewall proxies
- Increase Google OAuth timeout from 3.5s to 30s
- Add error handling and logging to auth signIn callback
- Fix Stripe webhook headers() to properly await async call (Next.js 16 compatibility)

### Added
- Bootstrap test framework with Vitest and Playwright
- Add auth configuration tests for OAuth provider
- Add E2E tests for homepage and auth-required pages
- GitHub Actions CI workflow for automated testing
- TESTING.md documentation

### Changed
- Update CLAUDE.md with skill routing rules and testing guidelines
