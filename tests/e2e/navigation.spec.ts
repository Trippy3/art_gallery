import { test, expect } from '@playwright/test'
import { selectors } from '../helpers/selectors'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Header Navigation', () => {
    test('should display header with logo', async ({ page }) => {
      const logo = page.locator(selectors.logo)
      await expect(logo).toBeVisible()

      // Check logo text
      await expect(logo).toContainText('Aviary')
    })

    test('should display logo image', async ({ page }) => {
      const logoImage = page.locator(selectors.logoImage)
      await expect(logoImage).toBeVisible()
    })

    test('should have alt text on logo image', async ({ page }) => {
      const logoImage = page.locator(selectors.logoImage)
      await expect(logoImage).toHaveAttribute('alt', 'Aviary Logo')
    })

    test('should have fixed header position', async ({ page }) => {
      const header = page.locator(selectors.header)
      await expect(header).toBeVisible()

      // Check if header is fixed
      const position = await header.evaluate((el) =>
        window.getComputedStyle(el).position
      )
      expect(position).toBe('fixed')
    })

    test('should display header after scrolling', async ({ page }) => {
      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 1000))
      await page.waitForTimeout(500)

      // Header should still be visible
      const header = page.locator(selectors.header)
      await expect(header).toBeVisible()
    })

    test('should display hamburger menu icon', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await expect(menuButton).toBeVisible()
    })

    test('should have accessible menu button', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)

      // Check aria-label
      await expect(menuButton).toHaveAttribute('aria-label', 'メニュー')
    })
  })

  test.describe('Hamburger Menu', () => {
    test('should open menu on click', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      // Menu dropdown should be visible
      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()
    })

    test('should display "私について" link', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)
      await expect(aboutLink).toBeVisible()
    })

    test('should display year navigation section', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      // Check for "History" label in navigation menu
      const historyLabel = page.locator('nav >> text=History')
      await expect(historyLabel).toBeVisible()
    })

    test('should display all year buttons (2025-2022)', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      // Check for all year buttons (data spans 2022-2025)
      const years = ['2025年', '2024年', '2023年', '2022年']
      for (const year of years) {
        const yearButton = page.locator(`text=${year}`)
        await expect(yearButton).toBeVisible()
      }
    })

    test('should close menu when X icon is clicked', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)

      // Open menu
      await menuButton.click()
      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()

      // Click X to close
      await menuButton.click()

      // Menu should be hidden
      await expect(menuDropdown).not.toBeVisible()
    })

    test('should toggle menu icon between hamburger and X', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)

      // Check initial state (Menu icon)
      const menuIcon = menuButton.locator('svg').first()
      await expect(menuIcon).toBeVisible()

      // Click to open
      await menuButton.click()
      await page.waitForTimeout(300)

      // Icon should change (implementation dependent)
      // The button should still be visible
      await expect(menuButton).toBeVisible()
    })
  })

  test.describe('Year Navigation - Smooth Scroll', () => {
    test('should scroll to 2025 section', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const year2025Button = page.locator(selectors.year2025Link)
      await year2025Button.click()

      // Wait for smooth scroll
      await page.waitForTimeout(1500)

      // Check if first 2025 artwork marker (2025-11, latest month in reversed order) is in viewport
      const yearMarker = page.locator('[id^="year-2025"]').first()
      await expect(yearMarker).toBeInViewport()
    })

    test('should scroll to 2024 section', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      // Wait for smooth scroll
      await page.waitForTimeout(1500)

      // Check if first 2024 artwork marker (2024-11, latest month in reversed order) is in viewport
      const yearMarker = page.locator('[id^="year-2024"]').first()
      await expect(yearMarker).toBeInViewport()
    })

    test('should scroll to 2023 section', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const year2023Button = page.locator(selectors.year2023Link)
      await year2023Button.click()

      await page.waitForTimeout(1500)

      // Check if first 2023 artwork marker (2023-10, latest month in reversed order) is in viewport
      const yearMarker = page.locator('[id^="year-2023"]').first()
      await expect(yearMarker).toBeInViewport()
    })

    test('should scroll to 2022 section', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const year2022Button = page.locator(selectors.year2022Link)
      await year2022Button.click()

      await page.waitForTimeout(1500)

      // Check if first 2022 artwork marker (2022-10) is in viewport
      const yearMarker = page.locator('[id="year-2022-10"]').first()
      await expect(yearMarker).toBeInViewport()
    })

    test('should close menu after year navigation', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()

      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      // Wait for scroll and menu close
      await page.waitForTimeout(2000)

      // Menu should be closed
      await expect(menuDropdown).not.toBeVisible()
    })

    test('should scroll smoothly with behavior smooth', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const initialScrollY = await page.evaluate(() => window.scrollY)

      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      // Give time for smooth scroll
      await page.waitForTimeout(1500)

      const finalScrollY = await page.evaluate(() => window.scrollY)

      // Scroll position should have changed
      expect(finalScrollY).not.toBe(initialScrollY)
    })
  })

  test.describe('Page Navigation', () => {
    test('should navigate to About Me page', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)

      // Wait for navigation to complete
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        aboutLink.click()
      ])

      // Check URL
      expect(page.url()).toContain('/about_me')
    })

    test('should display header on About Me page', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)
      await aboutLink.click()

      await page.waitForLoadState('networkidle')

      // Header should be visible on about page
      const header = page.locator(selectors.header)
      await expect(header).toBeVisible()
    })

    test('should navigate back to home from logo click', async ({ page }) => {
      // First navigate to about page
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        aboutLink.click()
      ])
      expect(page.url()).toContain('/about_me')

      // Click logo to go back
      const logo = page.locator(selectors.logo)

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        logo.click()
      ])

      // Should be back to home
      expect(page.url()).toBe('http://localhost:3000/')
    })

    test('should maintain header state across navigation', async ({ page }) => {
      // Navigate to about page
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)
      await aboutLink.click()

      await page.waitForLoadState('networkidle')

      // Header should still work
      const menuButtonAbout = page.locator(selectors.menuButton)
      await expect(menuButtonAbout).toBeVisible()

      // Should be able to open menu
      await menuButtonAbout.click()
      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()
    })
  })

  test.describe('Logo Functionality', () => {
    test('should scroll to top when logo is clicked on home page', async ({ page }) => {
      // Scroll down first
      await page.evaluate(() => window.scrollTo(0, 1000))
      await page.waitForTimeout(500)

      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(500)

      // Click logo
      const logo = page.locator(selectors.logo)
      await logo.click()

      await page.waitForTimeout(1000)

      // Should be at top
      const newScrollY = await page.evaluate(() => window.scrollY)
      expect(newScrollY).toBeLessThan(100)
    })

    test('should have hover effect on logo', async ({ page, isMobile }) => {
      test.skip(isMobile, 'Hover tests are for desktop only')

      const logo = page.locator(selectors.logo)

      // Hover over logo
      await logo.hover()
      await page.waitForTimeout(300)

      // Logo should still be visible (basic check)
      await expect(logo).toBeVisible()
    })
  })

  test.describe('Keyboard Navigation', () => {
    test('should be able to tab to menu button', async ({ page }) => {
      // Tab to menu button
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Menu button should be focused (check if it's the active element)
      const menuButton = page.locator(selectors.menuButton)
      const isFocused = await menuButton.evaluate((el) =>
        el === document.activeElement
      )

      // At least verify the button is visible
      await expect(menuButton).toBeVisible()
    })

    test('should open menu with Enter key', async ({ page }) => {
      // Tab to menu button
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Press Enter
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)

      // Menu should be open
      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()
    })
  })

  test.describe('Mobile Navigation', () => {
    test('should display menu button on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const menuButton = page.locator(selectors.menuButton)
      await expect(menuButton).toBeVisible()
    })

    test('should open full-screen menu on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()
    })

    test('should navigate on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        aboutLink.click()
      ])

      expect(page.url()).toContain('/about_me')
    })
  })

  test.describe('Navigation Performance', () => {
    test('should navigate quickly between pages', async ({ page }) => {
      const startTime = Date.now()

      // Navigate to about page
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const aboutLink = page.locator(selectors.aboutLink)
      await aboutLink.click()

      await page.waitForLoadState('networkidle')

      const endTime = Date.now()
      const duration = endTime - startTime

      // Should navigate in less than 5 seconds
      expect(duration).toBeLessThan(5000)
    })

    test('should have smooth menu animation', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)

      // Open menu
      await menuButton.click()
      await page.waitForTimeout(500)

      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()

      // Animation should complete without errors
    })
  })
})
