import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock global-agent
vi.mock('global-agent', () => ({
  bootstrap: vi.fn(),
}))

// Mock db
vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

// Set test environment variables
process.env.GOOGLE_CLIENT_ID = 'test-client-id'
process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret'
process.env.NEXTAUTH_SECRET = 'test-secret'
process.env.NEXTAUTH_URL = 'http://localhost:3000'

describe('auth configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should configure Google provider with timeout', async () => {
    const { authOptions } = await import('./auth')

    expect(authOptions.providers).toHaveLength(1)
    expect(authOptions.providers[0].id).toBe('google')
    expect(authOptions.providers[0].options?.httpOptions?.timeout).toBe(30000)
  })

  it('should use JWT session strategy', async () => {
    const { authOptions } = await import('./auth')

    expect(authOptions.session?.strategy).toBe('jwt')
  })
})
