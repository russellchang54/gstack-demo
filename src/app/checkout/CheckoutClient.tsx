"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutClient() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="text-gray-600 mb-6">Finance team members need to sign in to access checkout.</p>
          <p className="text-sm text-gray-500">Contact your admin to get finance role access.</p>
        </div>
      </div>
    )
  }

  if (session.user?.role !== "finance") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Only finance team members can access the checkout page.</p>
          <p className="text-sm text-gray-500">Your current role: {session.user?.role}</p>
        </div>
      </div>
    )
  }

  const handleCheckout = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1TIhnFQcXvZvwwpLkiKwO7jG", // Your actual price ID
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Finance Team - Complete Your Subscription
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your payment details below. Ops team members will receive access immediately after payment.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Stripe Checkout */}
          <div className="border-2 border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Pro Plan</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">$29/month</p>
              <p className="text-gray-600 mb-6">Billed monthly • Cancel anytime</p>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Pay with Stripe"}
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">What's included:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Unlimited ops team members</li>
              <li>• Real-time subscription status</li>
              <li>• Monthly billing with invoices</li>
              <li>• Priority support</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}