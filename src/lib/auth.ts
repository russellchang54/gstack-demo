import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"

// Bootstrap global-agent for proxy support
import { bootstrap } from "global-agent"
bootstrap()
// global-agent reads from GLOBAL_AGENT_HTTP_PROXY and GLOBAL_AGENT_HTTPS_PROXY

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 30000,
      },
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
      console.log("[AUTH] SignIn callback called for:", user.email);
      if (!user.email) {
        console.log("[AUTH] No email provided, rejecting");
        return false;
      }

      try {
        // Check if user exists, if not create them
        const existingUser = await db.user.findUnique({
          where: { email: user.email }
        });

        if (!existingUser) {
          console.log("[AUTH] Creating new user:", user.email);
          await db.user.create({
            email: user.email,
            name: user.name || undefined,
            role: "ops" // Default role
          });
        } else {
          console.log("[AUTH] Existing user found:", user.email);
        }

        return true;
      } catch (error) {
        console.error("[AUTH] Error in signIn callback:", error);
        return false;
      }
    }
  },
  session: {
    strategy: "jwt",
  },
}