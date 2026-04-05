# B2B Stripe Subscription App

A full-stack Next.js app with Stripe payments, Google authentication, and role-based access.

## Features

✅ **Authentication**: Google OAuth with NextAuth  
✅ **Role System**: Finance vs Ops users  
✅ **Payments**: Stripe Checkout integration  
✅ **Webhooks**: Handle payment events  
✅ **Dashboard**: Real-time subscription status  

## Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Auth**: NextAuth with Google
- **Payments**: Stripe
- **Database**: In-memory (for learning/testing)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** in `.env.local`:
   ```
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

4. **Test the flow**:
   - Visit http://localhost:3000
   - Sign in with Google
   - Set your role: `bun run scripts/set-user-role.ts your-email@gmail.com finance`
   - Go to checkout and test payment

## Testing Stripe Payments

Use these test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires auth**: `4000 0025 0000 3155`

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # NextAuth routes
│   │   │   ├── create-checkout-session/  # Stripe checkout
│   │   │   ├── subscription/  # Check subscription status
│   │   │   └── webhooks/stripe/  # Stripe webhooks
│   │   ├── checkout/  # Payment page
│   │   ├── dashboard/  # User dashboard
│   │   └── page.tsx  # Landing page
│   ├── components/
│   ├── lib/
│   │   ├── auth.ts  # Auth configuration
│   │   ├── db.ts  # In-memory database
│   │   └── stripe.ts  # Stripe client
│   └── types/
├── scripts/
│   ├── set-user-role.ts  # Set user role
│   └── test-api.ts  # Test API endpoints
└── test-flow.md  # Testing guide
```

## Next Steps

1. **Set up webhook**: Add endpoint in Stripe dashboard
2. **Real database**: Replace in-memory storage with PostgreSQL
3. **Email notifications**: Send invoices and receipts
4. **Team management**: Add/remove team members
5. **Subscription management**: Upgrade/downgrade plans

The foundation is solid - build on it! 🚀