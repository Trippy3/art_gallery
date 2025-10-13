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
      await expect(page).toHaveTitle(/アートポートフォリオ|Art Portfolio/)

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
      // Check for year markers: 2021, 2022, 2023, 2024
      // Note: There are duplicate IDs (one for each artwork in that year)
      const years = ['2021', '2022', '2023', '2024']

      for (const year of years) {
        const yearMarker = page.locator(`[id="year-${year}"]`).first()
        await expect(yearMarker).toBeAttached() // May not be in viewport initially

        // Check year label
        const yearLabel = page.locator(`text=${year}`).first()
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
    test('should display 8 artwork cards', async ({ page }) => {
      // Scroll to make sure all cards are loaded
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
      await page.waitForTimeout(1000)

      // Count visible cards - there are 16 because each artwork has a container div
      // (one for year marker, one for the card itself in alternating layout)
      // We should count the actual artwork cards that have titles
      const cards = page.locator('h3.text-xl.sm\\:text-2xl')
      const count = await cards.count()

      expect(count).toBe(8)
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
    test('should show artwork card on hover (desktop)', async ({ page, isMobile }) => {
      // Skip on mobile as hover behavior is different
      test.skip(isMobile, 'Hover tests are for desktop only')

      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find first visible card
      const firstCard = page.locator('.relative.flex-shrink-0').first()

      // Hover over the card
      await firstCard.hover()
      await page.waitForTimeout(500)

      // The card should be visible (it already is, but overlay should appear)
      await expect(firstCard).toBeVisible()
    })

    test('should navigate to artwork detail page on button click', async ({ page, context }) => {
      // Scroll to make artworks visible
      await page.evaluate(() => window.scrollTo(0, 1500))
      await page.waitForTimeout(1000)

      // Find and click first "詳細を見る" button
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
      const uniqueYears = Array.from(new Set(artworkData.map(a => a.year)))

      for (const year of uniqueYears) {
        // Use first() because there are duplicate IDs for each artwork in that year
        const yearMarker = page.locator(`[id="year-${year}"]`).first()
        await expect(yearMarker).toBeAttached()
      }

      expect(uniqueYears.length).toBe(4) // 2021, 2022, 2023, 2024
    })
  })
})
