"use client"

import { useSession } from "next-auth/react"
import LoginButton from "@/components/LoginButton"
import { useEffect, useState } from "react"

interface SubscriptionData {
  status: "active" | "inactive" | "no_customer"
  subscriptionId?: string
  currentPeriodEnd?: number
  plan?: string
}

export default function DashboardClient() {
  const { data: session } = useSession()
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchSubscription()
    }
  }, [session])

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/subscription")
      const data = await response.json()
      setSubscription(data)
    } catch (error) {
      console.error("Failed to fetch subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-6">You need to sign in to access the dashboard.</p>
          <p className="text-sm text-gray-500">Contact your admin to get access.</p>
        </div>
      </div>
    )
  }

  const subscriptionStatus = subscription?.status === "active" ? "active" : "inactive"
  const nextInvoiceDate = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()
    : "N/A"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Subscription Dashboard</h1>
            <LoginButton />
          </div>
        </div>
      </nav>

      {/* Welcome message */}
      <div className="mx-auto max-w-7xl px-6 py-4">
        <p className="text-gray-600">
          Welcome, {session.user?.name}!
          {session.user?.role === "finance"
            ? " You can manage billing and team access."
            : " You can view subscription status and usage."}
        </p>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">Loading subscription status...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subscription Status Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription Status</h2>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  subscriptionStatus === "active" ? "bg-green-500" : "bg-red-500"
                }`}></div>
                <span className="text-2xl font-semibold capitalize">
                  {subscriptionStatus}
                </span>
              </div>
              {subscriptionStatus === "active" && (
                <p className="text-sm text-gray-600 mt-2">
                  Your subscription is active and billing monthly.
                </p>
              )}
              {subscriptionStatus === "inactive" && (
                <p className="text-sm text-gray-600 mt-2">
                  No active subscription found.
                </p>
              )}
            </div>

            {/* Billing Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Billing</h2>
              <p className="text-sm text-gray-600">
                Next invoice: {nextInvoiceDate}
              </p>
              <p className="text-sm text-gray-600">
                Amount: $29/month
              </p>
              {session.user?.role === "finance" && subscriptionStatus === "inactive" && (
                <a
                  href="/checkout"
                  className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
                >
                  Subscribe now →
                </a>
              )}
              {session.user?.role === "finance" && subscriptionStatus === "active" && (
                <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                  Manage billing →
                </button>
              )}
            </div>

            {/* Team Access Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Team Access</h2>
              <p className="text-sm text-gray-600">
                12 team members have access
              </p>
              {session.user?.role === "finance" && (
                <button className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                  Manage team →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <h3 className="font-medium text-gray-900">View Usage</h3>
              <p className="text-sm text-gray-600">Check your team's activity</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <h3 className="font-medium text-gray-900">Get Support</h3>
              <p className="text-sm text-gray-600">Contact our support team</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}