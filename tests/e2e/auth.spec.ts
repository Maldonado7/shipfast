import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('homepage loads correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Next.js 15 Full-Stack Template')
    await expect(page.getByRole('link', { name: 'Get Started' })).toBeVisible()
  })

  test('can navigate to login page', async ({ page }) => {
    await page.click('a[href="/login"]')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
  })

  test('can navigate to register page', async ({ page }) => {
    await page.click('a[href="/register"]')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveURL('/register')
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
  })

  test('login form validation works', async ({ page }) => {
    await page.goto('/login')
    
    // Try to submit without filling form
    await page.click('button[type="submit"]')
    
    // Check for HTML5 validation (required fields)
    const emailInput = page.locator('input[name="email"]')
    await expect(emailInput).toHaveAttribute('required')
    
    const passwordInput = page.locator('input[name="password"]')
    await expect(passwordInput).toHaveAttribute('required')
  })
})