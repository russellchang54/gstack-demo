import { test, expect } from '@playwright/test'

test('homepage loads with sign in button', async ({ page }) => {
  await page.goto('/')

  // Check the page title
  await expect(page).toHaveTitle(/B2B Subscription Service/)

  // Check for sign in button
  const signInButton = page.getByText(/Sign in with Google/i)
  await expect(signInButton).toBeVisible()
})

test('checkout page requires auth', async ({ page }) => {
  await page.goto('/checkout')

  // Should show sign in prompt for unauthenticated users
  const signInPrompt = page.getByText(/Please sign in/i)
  await expect(signInPrompt).toBeVisible()
})

test('dashboard page requires auth', async ({ page }) => {
  await page.goto('/dashboard')

  // Should show sign in prompt for unauthenticated users
  const signInPrompt = page.getByText(/Please sign in/i)
  await expect(signInPrompt).toBeVisible()
})