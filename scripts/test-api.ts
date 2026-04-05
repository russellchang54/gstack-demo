// Test API endpoints

async function testEndpoints() {
  console.log("Testing API endpoints...")

  const baseUrl = "http://localhost:3000"

  // Test home page
  console.log("\n1. Testing home page...")
  const homeRes = await fetch(baseUrl)
  console.log(`   Status: ${homeRes.status}`)

  // Test checkout page (should redirect or show auth required)
  console.log("\n2. Testing checkout page...")
  const checkoutRes = await fetch(`${baseUrl}/checkout`)
  console.log(`   Status: ${checkoutRes.status}`)

  // Test dashboard page
  console.log("\n3. Testing dashboard page...")
  const dashboardRes = await fetch(`${baseUrl}/dashboard`)
  console.log(`   Status: ${dashboardRes.status}`)

  // Test API routes
  console.log("\n4. Testing API routes...")

  // Test subscription API (should fail without auth)
  const subRes = await fetch(`${baseUrl}/api/subscription`)
  console.log(`   /api/subscription: ${subRes.status}`)

  // Test checkout session API (should fail without auth)
  const checkoutApiRes = await fetch(`${baseUrl}/api/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId: "price_1TIhnFQcXvZvwwpLkiKwO7jG" })
  })
  console.log(`   /api/create-checkout-session: ${checkoutApiRes.status}`)

  console.log("\n✅ API tests complete!")
}

testEndpoints().catch(console.error)