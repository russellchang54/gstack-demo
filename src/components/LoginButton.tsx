"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {session.user?.name} ({session.user?.role})
        </span>
        <button
          onClick={() => signOut()}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Sign out
        </button>
      </div>
    )
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
    >
      Sign in with Google
    </button>
  )
}