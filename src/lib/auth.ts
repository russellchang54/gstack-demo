import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user?.email) {
        const user = await db.user.findUnique({
          where: { email: session.user.email }
        })
        if (user) {
          session.user.id = user.id
          session.user.role = user.role
        }
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: user.email }
        })
        if (dbUser) {
          token.sub = dbUser.id
        }
      }
      return token
    },
    signIn: async ({ user, account, profile }) => {
      if (!user.email) return false

      // Check if user exists, if not create them
      const existingUser = await db.user.findUnique({
        where: { email: user.email }
      })

      if (!existingUser) {
        await db.user.create({
          email: user.email,
          name: user.name || undefined,
          role: "ops" // Default role
        })
      }

      return true
    }
  },
  session: {
    strategy: "jwt",
  },
}