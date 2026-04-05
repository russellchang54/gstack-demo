import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Get user info from metadata
        const userId = session.metadata?.userId
        const userEmail = session.metadata?.userEmail

        if (!userId || !userEmail) {
          console.error("Missing user metadata in session")
          return NextResponse.json({ error: "Missing user metadata" }, { status: 400 })
        }

        // Get the subscription ID
        const subscriptionId = session.subscription as string

        if (!subscriptionId) {
          console.error("No subscription ID in session")
          return NextResponse.json({ error: "No subscription" }, { status: 400 })
        }

        console.log(`✅ Payment successful!`)
        console.log(`   User: ${userEmail} (${userId})`)
        console.log(`   Subscription ID: ${subscriptionId}`)
        console.log(`   Customer ID: ${session.customer}`)

        // In production, you'd update your database here
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`✅ Payment succeeded for invoice ${invoice.id}`)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`❌ Payment failed for invoice ${invoice.id}`)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        console.log(`🗑️ Subscription deleted: ${subscription.id}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}