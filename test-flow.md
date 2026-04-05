# Testing Your Stripe Subscription Flow

## 1. Test the Home Page
- Visit: http://localhost:3000
- You should see the landing page with "B2B Subscription Service"

## 2. Test Authentication
- Click "Sign in with Google"
- Sign in with your Google account
- After sign-in, you should be redirected back to the home page

## 3. Set User Role (First Time Only)
After signing in, run this command to set your role to finance:
```bash
bun run scripts/set-user-role.ts your-email@gmail.com finance
```

## 4. Test Checkout Flow
- As a finance user, click "Go to Checkout"
- You should see the checkout page with $29/month
- Click "Pay with Stripe"
- You'll be redirected to Stripe's checkout page
- Use test card: `4242 4242 4242 4242`
- Any future date for expiry, any 3-digit CVC

## 5. Test Dashboard
- After payment, you'll be redirected to the dashboard
- Dashboard should show "Active" subscription status
- As ops user (set role to "ops"), you can only view status

## 6. Test Webhook (Optional)
For full functionality, set up webhook in Stripe dashboard:
- Endpoint: `http://localhost:3000/api/webhooks/stripe`
- Events: `checkout.session.completed`, `invoice.payment_succeeded`

## Test Cards for Stripe
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

The flow is ready! 🚀