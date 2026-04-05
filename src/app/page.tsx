"use client"

import Link from "next/link"
import LoginButton from "@/components/LoginButton"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            B2B Subscription Service
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Finance teams pay $29/month. Ops teams get value. Everyone's happy.
          </p>

          {session ? (
            <div className="flex justify-center space-x-4">
              {session.user?.role === "finance" && (
                <Link
                  href="/checkout"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Go to Checkout →
                </Link>
              )}
              <Link
                href="/dashboard"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                View Dashboard →
              </Link>
            </div>
          ) : (
            <div>
              <LoginButton />
              <p className="mt-4 text-sm text-gray-600">
                Sign in to access your subscription
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">For Finance Teams</h2>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Simple checkout process</li>
              <li>✓ Automatic invoicing</li>
              <li>✓ Monthly billing</li>
              <li>✓ Easy team management</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">For Ops Teams</h2>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Instant access after payment</li>
              <li>✓ Real-time status updates</li>
              <li>✓ Team collaboration</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}