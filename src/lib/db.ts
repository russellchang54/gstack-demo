// Simple in-memory storage for testing
// In production, you'd use a real database

interface User {
  id: string
  email: string
  name?: string
  role: "finance" | "ops"
}

interface Session {
  sessionToken: string
  userId: string
  expires: Date
}

// In-memory storage
const users: Record<string, User> = {}
const sessions: Record<string, Session> = {}

export const db = {
  user: {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) return users[where.id] || null
      if (where.email) {
        return Object.values(users).find(u => u.email === where.email) || null
      }
      return null
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<User> }) => {
      const user = users[where.id]
      if (!user) throw new Error("User not found")
      Object.assign(user, data)
      return user
    },
    create: async (data: Omit<User, 'id'>) => {
      const id = Math.random().toString(36).substring(7)
      const user = { ...data, id }
      users[id] = user
      return user
    },
  },
  session: {
    create: async (data: Session) => {
      sessions[data.sessionToken] = data
      return data
    },
    findUnique: async ({ where }: { where: { sessionToken: string } }) => {
      return sessions[where.sessionToken] || null
    },
  },
}

// Initialize with a test user
users["test123"] = {
  id: "test123",
  email: "test@example.com",
  name: "Test User",
  role: "finance"
}