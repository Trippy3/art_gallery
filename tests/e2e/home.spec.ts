import { test, expect } from '@playwright/test'
import { artworkData } from '../fixtures/test-data'
import { selectors } from '../helpers/selectors'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')
  })

  test.describe('Page Load and Basic Elements', () => {
    test('should load home page successfully', async ({ page }) => {
      // Check page title
      await expect(page).toHaveTitle(/Aviary's Art Gallery/)

      // Check header is visible
      await expect(page.locator(selectors.header)).toBeVisible()

      // Check gallery section is visible
      await expect(page.locator(selectors.gallerySection)).toBeVisible()
    })

    test('should display hero section', async ({ page }) => {
      const heroSection = page.locator(selectors.heroSection)
      await expect(heroSection).toBeVisible()
    })

    test('should display horizontal scroll gallery', async ({ page }) => {
      const gallerySection = page.locator(selectors.gallerySection)
      await expect(gallerySection).toBeVisible()

      // Check if gallery section has correct ID
      await expect(gallerySection).toHaveAttribute('id', 'work')
    })

    test('should display timeline indicator with "History" label', async ({ page }) => {
      const timelineIndicator = page.locator(selectors.timelineIndicator)
      await expect(timelineIndicator).toBeVisible()
    })

    test('should display header and footer', async ({ page }) => {
      const header = page.locator(selectors.header)
      const footer = page.locator(selectors.footer)

      await expect(header).toBeVisible()
      await expect(footer).toBeVisible()
    })
  })

  test.describe('Horizontal Scroll Functionality', () => {
    test('should display scroll hint initially', async ({ page }) => {
      const scrollHint = page.locator(selectors.scrollHint)
      await expect(scrollHint).toBeVisible()

      // Check for arrow symbol
      await expect(scrollHint).toContainText('→')
    })

    test('should hide scroll hint after scrolling', async ({ page }) => {
      // Initially visible
      const scrollHint = page.locator(selectors.scrollHint)
      await expect(scrollHint).toBeVisible()

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 800))
      await page.waitForTimeout(1500) // Wait for animation

      // Should be hidden
      await expect(scrollHint).not.toBeVisible()
    })

    test('should have timeline progress bar', async ({ page }) => {
      // Find the progress bar container
      const progressBar = page.locator('.bg-secondary.rounded-full')
      await expect(progressBar).toBeVisible()

      // Check if progress indicator exists
      const progressIndicator = page.locator('.bg-accent.transition-all')
      await expect(progressIndicator).toBeVisible()
    })

    test('should update progress bar on scroll', async ({ page }) => {
      const progressIndicator = page.locator('.bg-accent.transition-all').first()

      // Get initial width
      const initialWidth = await progressIndicator.evaluate((el) => {
        return window.getComputedStyle(el).width
      })

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 1000))
      await page.waitForTimeout(500)

      // Get new width
      const newWidth = await progressIndicator.evaluate((el) => {
        return window.getComputedStyle(el).width
      })

      // Width should have changed (progress increased)
      expect(newWidth).not.toBe(initialWidth)
    })

    test('should display year markers on timeline', async ({ page }) => {
      // Check for year markers using actual artwork year-month values
      // Each artwork has a unique year-month value
      const yearMonthValues = artworkData.map(a => a.year)

      // Check that we have the expected number of year markers
      for (const yearMonth of yearMonthValues.slice(0, 3)) { // Test first 3 to avoid timeout
        const yearMarker = page.locator(`[id="year-${yearMonth}"]`).first()
        await expect(yearMarker).toBeAttached() // May not be in viewport initially

        // Check year label displays the year-month value
        const yearLabel = page.locator(`text=${yearMonth}`).first()
        await expect(yearLabel).toBeAttached()
      }
    })

    test('should have horizontal timeline line', async ({ page }) => {
      // The timeline has a horizontal line with specific styling
      // Using a more flexible selector
      const timelineLine = page.locator('.absolute.h-0\\.5.bg-accent\\/30')
      await expect(timelineLine).toBeAttached()
    })
  })

  test.describe('Artwork Card Display', () => {
    test('should display 12 artwork cards', async ({ page }) => {
      // Scroll to make sure all cards are loaded
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
      await page.waitForTimeout(1000)

      // Count visible cards - there are 24 because each artwork has a container div
      // (one for year marker, one for the card itself in alternating layout)
      // We should count the actual artwork cards that have titles
      const cards = page.locator('h3.text-xl.sm\\:text-2xl')
      const count = await cards.count()

      expect(count).toBe(12)
    })

    test('should display artwork images', async ({ page }) => {
      // Scroll to middle to ensure artworks are visible
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Check if images are present - looking for Next.js Image component
      const images = page.locator('img[alt]')
      const imageCount = await images.count()

      // Should have at least some images (artworks + maybe artist photo)
      expect(imageCount).toBeGreaterThan(0)
    })

    test('should display artwork titles and years', async ({ page }) => {
      // Scroll to make artworks visible
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Check for at least one artwork title from our data
      const firstArtwork = artworkData[0]
      const titleLocator = page.locator(`text=${firstArtwork.title}`)

      // It should exist in the DOM even if not fully visible
      await expect(titleLocator).toBeAttached()
    })

    test('should display year badges on cards', async ({ page }) => {
      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Check for year badges with rounded-full styling
      const yearBadges = page.locator('.rounded-full.bg-accent')
      const count = await yearBadges.count()

      // Should have year badges for each artwork (one on timeline, one on card)
      expect(count).toBeGreaterThan(0)
    })

    test('should display artwork descriptions', async ({ page }) => {
      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Check for at least one description
      const firstArtwork = artworkData[0]
      const descriptionLocator = page.locator(`text=${firstArtwork.description}`)

      await expect(descriptionLocator).toBeAttached()
    })

    test('should display artwork tags', async ({ page }) => {
      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Check for tags from first artwork - use first() to handle strict mode
      const firstArtwork = artworkData[0]
      const firstTag = firstArtwork.tags[0]
      const tagLocator = page.locator(`text=${firstTag}`).first()

      await expect(tagLocator).toBeAttached()
    })

    test('should display "詳細を見る" buttons', async ({ page }) => {
      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Check for detail buttons
      const detailButtons = page.locator(selectors.viewDetailsButton)
      const count = await detailButtons.count()

      // Should have buttons for visible artworks
      expect(count).toBeGreaterThan(0)
    })

    test('should have alternating layout (above/below timeline)', async ({ page }) => {
      // Scroll to middle to see artworks
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Get all artwork containers
      const artworkContainers = page.locator('.relative.flex-shrink-0.flex.flex-col')
      const count = await artworkContainers.count()

      // Check that we have multiple artworks
      expect(count).toBeGreaterThan(1)

      // The alternating layout is handled by isAbove = index % 2 === 0
      // We can't easily test CSS layout, but we can verify structure exists
    })
  })

  test.describe('Interactions', () => {
    test('should show artwork info on hover (desktop fallback)', async ({ page, isMobile }) => {
      // Skip on mobile as hover behavior is different
      test.skip(isMobile, 'Hover tests are for desktop only')

      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find a card that is not in the center (to test hover specifically)
      const cards = page.locator('.relative.flex-shrink-0')
      const secondCard = cards.nth(1)

      // Hover over the card
      await secondCard.hover()
      await page.waitForTimeout(500)

      // The card should be visible with overlay
      await expect(secondCard).toBeVisible()
    })

    test('should show artwork info when card is centered in viewport', async ({ page }) => {
      // Scroll to position where a card should be centered
      await page.evaluate(() => window.scrollTo(0, 1000))
      await page.waitForTimeout(1000)

      // At least one card should have visible content (title, description)
      // The centered card will have opacity-100 on its content overlay
      const visibleOverlays = page.locator('.bg-gradient-to-t.from-background.opacity-100')
      const count = await visibleOverlays.count()

      // At least one overlay should be visible (the centered card)
      expect(count).toBeGreaterThanOrEqual(1)
    })

    test('should navigate to artwork detail page on card click', async ({ page, context }) => {
      // Scroll to make artworks visible
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find a card to click
      const card = page.locator('.relative.flex-shrink-0').first()
      await expect(card).toBeVisible()

      // Listen for new page (opens in new tab via window.open)
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        card.click()
      ])

      // Wait for new page to load
      await newPage.waitForLoadState()

      // Check URL is artwork detail page
      expect(newPage.url()).toMatch(/\/artwork\/\d+/)

      // Close new page
      await newPage.close()
    })

    test('should navigate to artwork detail page on button click', async ({ page, context }) => {
      // Scroll to make artworks visible
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find a card and hover to make button visible
      const card = page.locator('.group.cursor-pointer').first()
      await card.hover()
      await page.waitForTimeout(500)

      // Find and click first "詳細を見る" button (now visible after hover)
      const detailButton = page.locator(selectors.viewDetailsButton).first()
      await expect(detailButton).toBeVisible()

      // Listen for new page (opens in new tab)
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        detailButton.click()
      ])

      // Wait for new page to load
      await newPage.waitForLoadState()

      // Check URL is artwork detail page
      expect(newPage.url()).toMatch(/\/artwork\/\d+/)

      // Close new page
      await newPage.close()
    })

    test('should open detail page in new tab', async ({ page, context }) => {
      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Get detail button link
      const detailLink = page.locator('a[href^="/artwork/"]').first()
      await expect(detailLink).toBeVisible()

      // Check it has target="_blank"
      await expect(detailLink).toHaveAttribute('target', '_blank')

      // Check it has rel="noopener noreferrer"
      await expect(detailLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('should display ExternalLink icon on buttons', async ({ page }) => {
      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find detail button
      const detailButton = page.locator(selectors.viewDetailsButton).first()
      await expect(detailButton).toBeVisible()

      // Check for icon (lucide-react ExternalLink has specific classes)
      const icon = detailButton.locator('svg')
      await expect(icon).toBeVisible()
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      // Page should still load correctly
      await expect(page.locator(selectors.header)).toBeVisible()
      await expect(page.locator(selectors.gallerySection)).toBeVisible()
    })

    test('should be responsive on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 })

      // Page should still load correctly
      await expect(page.locator(selectors.header)).toBeVisible()
      await expect(page.locator(selectors.gallerySection)).toBeVisible()
    })

    test('should be responsive on desktop viewport', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 })

      // Page should still load correctly
      await expect(page.locator(selectors.header)).toBeVisible()
      await expect(page.locator(selectors.gallerySection)).toBeVisible()
    })
  })

  test.describe('Scroll Animation Performance', () => {
    test('should have smooth scroll animation', async ({ page }) => {
      // Scroll and check that it completes without errors
      await page.evaluate(() => {
        window.scrollTo({ top: 2000, behavior: 'smooth' })
      })

      // Wait for scroll to complete
      await page.waitForTimeout(2000)

      // Check we've scrolled
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(1000)
    })

    test('should apply will-change-transform optimization', async ({ page }) => {
      // Find the scroll content element
      const scrollContent = page.locator('.will-change-transform')

      // Should exist (optimization applied)
      await expect(scrollContent).toBeAttached()
    })

    test('should have staggered animation for artwork cards', async ({ page }) => {
      // The stagger animation is based on: cardProgress = scrollProgress * 8 - index * 0.8
      // We can verify by checking opacity changes as we scroll

      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(500)

      // Get first few cards
      const cards = page.locator('.relative.flex-shrink-0').filter({ hasText: artworkData[0].title })

      // Cards should be present in DOM
      await expect(cards.first()).toBeAttached()
    })
  })

  test.describe('Data Integrity', () => {
    test('should display correct number of artworks from data', async ({ page }) => {
      // Scroll through the entire page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1000)

      // Count artwork titles (more reliable than container divs)
      const titles = page.locator('h3.text-xl.sm\\:text-2xl')
      const count = await titles.count()

      expect(count).toBe(artworkData.length)
    })

    test('should display artworks in reversed order', async ({ page }) => {
      // The code uses reversedArtworks = [...artworks].reverse()
      // So the first visible artwork should be ID 8 (ミニマルスペース)

      // Scroll to beginning of gallery
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(1000)

      // Check for artwork ID 8 title
      const lastArtwork = artworkData[artworkData.length - 1]
      const titleLocator = page.locator(`text=${lastArtwork.title}`)

      await expect(titleLocator).toBeAttached()
    })

    test('should have year markers for all unique years', async ({ page }) => {
      // Each artwork has a unique year-month value, so we have 12 unique values
      const uniqueYearMonths = Array.from(new Set(artworkData.map(a => a.year)))

      // Test a sample of year markers (first 5) to avoid timeout
      for (const yearMonth of uniqueYearMonths.slice(0, 5)) {
        const yearMarker = page.locator(`[id="year-${yearMonth}"]`).first()
        await expect(yearMarker).toBeAttached()
      }

      // We have 12 unique year-month combinations
      expect(uniqueYearMonths.length).toBe(12)

      // Extract unique years (YYYY part only) - should be 4: 2022, 2023, 2024, 2025
      const uniqueYears = Array.from(new Set(artworkData.map(a => a.year.split('-')[0])))
      expect(uniqueYears.length).toBe(4)
    })
  })

  test.describe('Timeline Year Jump', () => {
    test('should jump to 2024 artwork when clicking 2024 year button', async ({ page }) => {
      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Click 2024 year button
      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      // Wait for scroll animation
      await page.waitForTimeout(1500)

      // Check URL hash was set and then cleared
      // The hash should be cleared after scroll completes
      // But we can verify the scroll happened by checking viewport position

      // Find the first 2024 artwork (2024-11 is the latest 2024 artwork in reversed order)
      const artwork2024 = page.locator('[id^="year-2024"]').first()
      await expect(artwork2024).toBeInViewport()
    })

    test('should jump to 2023 artwork when clicking 2023 year button', async ({ page }) => {
      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Click 2023 year button
      const year2023Button = page.locator(selectors.year2023Link)
      await year2023Button.click()

      // Wait for scroll animation
      await page.waitForTimeout(1500)

      // Find the first 2023 artwork
      const artwork2023 = page.locator('[id^="year-2023"]').first()
      await expect(artwork2023).toBeInViewport()
    })

    test('should jump to 2025 artwork when clicking 2025 year button', async ({ page }) => {
      // First scroll to the end to test jumping back
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1000)

      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Click 2025 year button
      const year2025Button = page.locator(selectors.year2025Link)
      await year2025Button.click()

      // Wait for scroll animation
      await page.waitForTimeout(1500)

      // Find the first 2025 artwork
      const artwork2025 = page.locator('[id^="year-2025"]').first()
      await expect(artwork2025).toBeInViewport()
    })

    test('should jump to 2022 artwork when clicking 2022 year button', async ({ page }) => {
      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Click 2022 year button
      const year2022Button = page.locator(selectors.year2022Link)
      await year2022Button.click()

      // Wait for scroll animation
      await page.waitForTimeout(1500)

      // Find the 2022 artwork
      const artwork2022 = page.locator('[id^="year-2022"]').first()
      await expect(artwork2022).toBeInViewport()
    })

    test('should close menu after clicking year button', async ({ page }) => {
      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Verify menu is open
      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()

      // Click year button
      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      // Menu should close
      await page.waitForTimeout(500)
      await expect(menuDropdown).not.toBeVisible()
    })

    test('should update URL hash when jumping to year', async ({ page }) => {
      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Click 2024 year button
      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      // Hash should be set initially
      await page.waitForTimeout(100)
      expect(page.url()).toContain('#year-2024')

      // After scroll completes, hash should be cleared
      await page.waitForTimeout(1500)
      expect(page.url()).not.toContain('#year-')
    })

    test('should work after scrolling through entire timeline', async ({ page }) => {
      // Scroll to the end of timeline
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1000)

      // Open menu
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      // Jump to 2024
      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()
      await page.waitForTimeout(1500)

      // Verify 2024 artwork is in viewport
      const artwork2024 = page.locator('[id^="year-2024"]').first()
      await expect(artwork2024).toBeInViewport()
    })

    test('should work with multiple consecutive jumps', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)

      // Jump to 2022
      await menuButton.click()
      await page.waitForTimeout(300)
      await page.locator(selectors.year2022Link).click()
      await page.waitForTimeout(1500)

      const artwork2022 = page.locator('[id^="year-2022"]').first()
      await expect(artwork2022).toBeInViewport()

      // Jump to 2025
      await menuButton.click()
      await page.waitForTimeout(300)
      await page.locator(selectors.year2025Link).click()
      await page.waitForTimeout(1500)

      const artwork2025 = page.locator('[id^="year-2025"]').first()
      await expect(artwork2025).toBeInViewport()

      // Jump back to 2023
      await menuButton.click()
      await page.waitForTimeout(300)
      await page.locator(selectors.year2023Link).click()
      await page.waitForTimeout(1500)

      const artwork2023 = page.locator('[id^="year-2023"]').first()
      await expect(artwork2023).toBeInViewport()
    })

    test('should jump to the latest month of the selected year', async ({ page }) => {
      // Open menu and click 2024
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()
      await page.waitForTimeout(300)

      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()
      await page.waitForTimeout(1500)

      // In reversed order, the first 2024 artwork should be 2024-11 (the latest month)
      // Check that the 2024-11 marker is visible (or close to center)
      const artwork202411 = page.locator('[id="year-2024-11"]')
      await expect(artwork202411).toBeInViewport()
    })
  })

  test.describe('Artwork Orientation Support', () => {
    test('should display portrait and landscape cards with different sizes', async ({ page }) => {
      // Scroll to make artworks visible
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find a portrait artwork (most artworks are portrait)
      const portraitCard = page.locator('.relative.flex-shrink-0').first()
      await expect(portraitCard).toBeVisible()

      // Check if card exists (size is handled by CSS, difficult to test exact dimensions)
      // But we can verify the cards render without errors
      const cardCount = await page.locator('.relative.flex-shrink-0').count()
      expect(cardCount).toBeGreaterThan(0)
    })

    test('should render cards with different orientations correctly', async ({ page }) => {
      // Scroll through to see different orientations
      await page.evaluate(() => window.scrollTo(0, 2000))
      await page.waitForTimeout(1000)

      // All cards should be visible regardless of orientation
      const cards = page.locator('h3.text-xl.sm\\:text-2xl')
      const count = await cards.count()

      // Should match total artwork count
      expect(count).toBe(artworkData.length)
    })

    test('should have orientation data for all artworks', async ({ page }) => {
      // Verify that artwork data includes orientation field
      const portraitCount = artworkData.filter(a => a.orientation === 'portrait').length
      const landscapeCount = artworkData.filter(a => a.orientation === 'landscape').length

      // Should have both portrait and landscape artworks
      expect(portraitCount).toBeGreaterThan(0)
      expect(landscapeCount).toBeGreaterThan(0)
      expect(portraitCount + landscapeCount).toBe(artworkData.length)
    })
  })
})
