# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust your instincts, and ship with confidence — without them, vibe coding is just yolo coding. With tests, it's a superpower.

## Framework

- **Unit/Integration:** Vitest + @testing-library/react + jsdom
- **E2E:** Playwright

## Running Tests

```bash
# Run all unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui
```

## Test Layers

### Unit Tests (`src/**/*.test.ts`)
- Test individual functions, utilities, and business logic
- Mock external dependencies (DB, APIs, etc.)
- Fast feedback loop

### Integration Tests (`src/**/*.test.tsx`)
- Test React components with @testing-library/react
- Test hooks, context providers, and component interactions
- Mock external services but test component integration

### E2E Tests (`e2e/*.spec.ts`)
- Test full user flows through the browser
- Run against a real (or realistic) environment
- Cover critical paths: auth, checkout, subscription management

## Conventions

- **File naming:** Use `.test.ts` for unit tests, `.test.tsx` for component tests
- **Test naming:** Describe what the code DOES, not what it IS
- **Assertions:** Test behavior, not implementation. Avoid `expect(x).toBeDefined()` — test the actual behavior.
- **Mocking:** Use vi.mock() at the top level for module mocks
- **Setup:** Common mocks (next-auth, next/navigation) are in `src/test/setup.ts`

## Test Expectations

- 100% test coverage is the goal — tests make vibe coding safe
- When writing new functions, write a corresponding test
- When fixing a bug, write a regression test
- When adding error handling, write a test that triggers the error
- When adding a conditional (if/else, switch), write tests for BOTH paths
- Never commit code that makes existing tests fail
