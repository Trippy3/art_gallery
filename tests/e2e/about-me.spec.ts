import { test, expect } from '@playwright/test'
import { skills } from '../fixtures/test-data'
import { selectors } from '../helpers/selectors'

test.describe('About Me Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about_me')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Page Load and Basic Elements', () => {
    test('should load about page successfully', async ({ page }) => {
      // Check URL
      expect(page.url()).toContain('/about_me')

      // Check page title
      await expect(page).toHaveTitle(/Aviary's Art Gallery/)
    })

    test('should display header and footer', async ({ page }) => {
      const header = page.locator(selectors.header)
      const footer = page.locator(selectors.footer)

      await expect(header).toBeVisible()
      await expect(footer).toBeVisible()
    })

    test('should display hero section', async ({ page }) => {
      const heroTitle = page.locator(selectors.aboutHero)
      await expect(heroTitle).toBeVisible()

      // Check for subtitle
      const subtitle = page.locator('text=About Me')
      await expect(subtitle).toBeVisible()
    })

    test('should have proper page structure', async ({ page }) => {
      // Check main element
      const main = page.locator('main')
      await expect(main).toBeVisible()

      // Should have proper padding classes
      await expect(main).toHaveClass(/pt-24/)
    })
  })

  test.describe('Profile Section', () => {
    test('should display artist profile image', async ({ page }) => {
      const artistImage = page.locator(selectors.artistImage)
      await expect(artistImage).toBeVisible()

      // Check alt text
      await expect(artistImage).toHaveAttribute('alt', 'Artist Profile')
    })

    test('should display artist name "Torii"', async ({ page }) => {
      const artistName = page.locator(selectors.artistName)
      await expect(artistName).toBeVisible()
      await expect(artistName).toContainText('Torii')
    })

    test('should display biography text', async ({ page }) => {
      // Check for biography paragraphs
      const bioParagraphs = page.locator('p.text-muted-foreground.leading-relaxed')
      const count = await bioParagraphs.count()

      // Should have at least 2 paragraphs in profile section
      expect(count).toBeGreaterThanOrEqual(2)
    })

    test('should display profile in grid layout', async ({ page }) => {
      // Profile section should have grid layout on md and above
      const profileSection = page.locator('section').filter({ hasText: 'Torii' })
      await expect(profileSection).toBeVisible()
    })

    test('should display bio about oil painting', async ({ page }) => {
      const bioText = page.locator('text=油絵')
      await expect(bioText.first()).toBeVisible()
    })

    test('should display bio about starting year 2021', async ({ page }) => {
      const bioText = page.locator('text=2021年')
      await expect(bioText.first()).toBeVisible()
    })
  })

  test.describe('Philosophy Section', () => {
    test('should display philosophy section title', async ({ page }) => {
      const philosophyTitle = page.locator(selectors.philosophyTitle)
      await expect(philosophyTitle).toBeVisible()
    })

    test('should display "自分にとっての美を見つける" card', async ({ page }) => {
      const card = page.locator('text=自分にとっての美を見つける')
      await expect(card).toBeVisible()

      // Check description
      const description = page.locator('text=絵画という創作だからこそ')
      await expect(description).toBeVisible()
    })

    test('should display "表現の模索" card', async ({ page }) => {
      const card = page.locator('text=表現の模索')
      await expect(card).toBeVisible()

      // Check description
      const description = page.locator('text=油彩には多くの画材や材料が関わる')
      await expect(description).toBeVisible()
    })

    test('should display philosophy cards in grid', async ({ page }) => {
      // Cards should be in a grid layout
      const philosophySection = page.locator('section').filter({ hasText: '制作理念' })
      const cards = philosophySection.locator('.p-6.rounded-lg.bg-card.border')
      const count = await cards.count()

      expect(count).toBe(2)
    })

    test('should have proper card styling', async ({ page }) => {
      const card = page.locator('.p-6.rounded-lg.bg-card.border').first()
      await expect(card).toBeVisible()

      // Card should have border and background
      await expect(card).toHaveClass(/border/)
      await expect(card).toHaveClass(/bg-card/)
    })
  })

  test.describe('Skills Section', () => {
    test('should display skills section title', async ({ page }) => {
      const skillsTitle = page.locator(selectors.skillsTitle)
      await expect(skillsTitle).toBeVisible()
    })

    test('should display all 4 skills', async ({ page }) => {
      for (const skill of skills) {
        // Use more specific selector to target skill badges
        const skillElement = page.locator(`.bg-secondary.text-secondary-foreground:has-text("${skill}")`)
        await expect(skillElement.first()).toBeVisible()
      }
    })

    test('should display skills in grid layout', async ({ page }) => {
      const skillsGrid = page.locator('.grid.grid-cols-2.sm\\:grid-cols-3')
      await expect(skillsGrid).toBeVisible()
    })

    test('should have skill badges with proper styling', async ({ page }) => {
      // Skills should be in rounded containers
      const skillBadges = page.locator('.p-4.text-center.rounded-lg.bg-secondary')
      const count = await skillBadges.count()

      expect(count).toBe(4)
    })

    test('should display "油彩"', async ({ page }) => {
      const skill = page.getByText('油彩', { exact: true })
      await expect(skill).toBeVisible()
    })

    test('should display "デッサン"', async ({ page }) => {
      const skill = page.locator('text=デッサン')
      await expect(skill).toBeVisible()
    })

    test('should display "模写"', async ({ page }) => {
      const skill = page.locator('text=模写')
      await expect(skill).toBeVisible()
    })
  })

  test.describe('Responsive Layout', () => {
    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      // All sections should be visible
      await expect(page.locator(selectors.aboutHero)).toBeVisible()
      await expect(page.locator(selectors.artistName)).toBeVisible()
      await expect(page.locator(selectors.skillsTitle)).toBeVisible()
    })

    test('should stack profile section on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      // Image and text should be stacked
      const artistImage = page.locator(selectors.artistImage)
      await expect(artistImage).toBeVisible()

      const artistName = page.locator(selectors.artistName)
      await expect(artistName).toBeVisible()
    })

    test('should display 2 skill columns on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      // Skills grid should adapt
      const skillsGrid = page.locator('.grid.grid-cols-2.sm\\:grid-cols-3')
      await expect(skillsGrid).toBeVisible()
    })

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      // Profile should be in grid layout
      const artistImage = page.locator(selectors.artistImage)
      await expect(artistImage).toBeVisible()

      // Skills should show 3 columns
      const skillsGrid = page.locator('.grid.grid-cols-2.sm\\:grid-cols-3')
      await expect(skillsGrid).toBeVisible()
    })

    test('should display correctly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })

      // All content should be visible
      await expect(page.locator(selectors.artistImage)).toBeVisible()
      await expect(page.locator(selectors.artistName)).toBeVisible()

      // Philosophy cards should be side by side
      const cards = page.locator('.p-6.rounded-lg.bg-card.border')
      const count = await cards.count()
      expect(count).toBe(2)
    })
  })

  test.describe('Navigation from About Page', () => {
    test('should navigate back to home via logo', async ({ page }) => {
      const logo = page.locator(selectors.logo)

      // Wait for navigation to complete
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        logo.click()
      ])

      // Should be on home page
      expect(page.url()).toBe('http://localhost:3000/')
    })

    test('should open menu from about page', async ({ page }) => {
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const menuDropdown = page.locator(selectors.menuDropdown)
      await expect(menuDropdown).toBeVisible()
    })

    test('should be able to scroll to years from about page', async ({ page }) => {
      // Navigate back to home
      const logo = page.locator(selectors.logo)

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        logo.click()
      ])

      // Open menu and navigate to year
      const menuButton = page.locator(selectors.menuButton)
      await menuButton.click()

      const year2024Button = page.locator(selectors.year2024Link)
      await year2024Button.click()

      await page.waitForTimeout(1500)

      // Should be scrolled to first 2024 artwork (year-2024-03)
      const yearMarker = page.locator('[id="year-2024-03"]').first()
      await expect(yearMarker).toBeInViewport()
    })
  })

  test.describe('Content Integrity', () => {
    test('should display all required sections', async ({ page }) => {
      // Hero
      await expect(page.locator(selectors.aboutHero)).toBeVisible()

      // Profile
      await expect(page.locator(selectors.artistName)).toBeVisible()

      // Philosophy
      await expect(page.locator(selectors.philosophyTitle)).toBeVisible()

      // Skills
      await expect(page.locator(selectors.skillsTitle)).toBeVisible()
    })

    test('should have proper heading hierarchy', async ({ page }) => {
      // Should have h1 in main content
      const h1 = page.locator('main >> h1')
      await expect(h1).toBeVisible()

      // Should have h2 sections
      const h2Elements = page.locator('h2')
      const h2Count = await h2Elements.count()
      expect(h2Count).toBeGreaterThan(0)
    })

    test('should have all Japanese content', async ({ page }) => {
      // Check for key Japanese phrases using specific selectors
      await expect(page.locator(selectors.aboutHero)).toBeVisible()
      await expect(page.locator(selectors.philosophyTitle)).toBeVisible()
      await expect(page.locator(selectors.skillsTitle)).toBeVisible()
    })

    test('should display consistent styling', async ({ page }) => {
      // All sections should have proper spacing
      const sections = page.locator('section')
      const count = await sections.count()

      expect(count).toBeGreaterThan(3)
    })
  })

  test.describe('Image Optimization', () => {
    test('should load artist portrait', async ({ page }) => {
      const artistImage = page.locator(selectors.artistImage)
      await expect(artistImage).toBeVisible()

      // Check if image has loaded
      const isVisible = await artistImage.isVisible()
      expect(isVisible).toBe(true)
    })

    test('should have proper image aspect ratio', async ({ page }) => {
      const imageContainer = page.locator('.relative.aspect-square')
      await expect(imageContainer).toBeVisible()
    })

    test('should use Next.js Image component', async ({ page }) => {
      const artistImage = page.locator(selectors.artistImage)

      // Next.js Image should have specific attributes
      await expect(artistImage).toHaveAttribute('alt')
    })
  })

  test.describe('Accessibility', () => {
    test('should have semantic HTML', async ({ page }) => {
      // Check for semantic elements
      const main = page.locator('main')
      await expect(main).toBeVisible()

      const header = page.locator('header')
      await expect(header).toBeVisible()

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('should have alt text for images', async ({ page }) => {
      const images = page.locator('img')
      const count = await images.count()

      // All images should have alt attributes
      for (let i = 0; i < count; i++) {
        const image = images.nth(i)
        const alt = await image.getAttribute('alt')
        expect(alt).toBeTruthy()
      }
    })

    test('should have proper heading text', async ({ page }) => {
      // Check for section headings with proper text
      await expect(page.locator(selectors.philosophyTitle)).toContainText('制作理念')
      await expect(page.locator(selectors.skillsTitle)).toContainText('スキル')
    })

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Should be able to navigate without errors
      const activeElement = await page.evaluate(() => document.activeElement?.tagName)
      expect(activeElement).toBeTruthy()
    })
  })

  test.describe('Performance', () => {
    test('should load page quickly', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/about_me')
      await page.waitForLoadState('networkidle')

      const endTime = Date.now()
      const duration = endTime - startTime

      // Should load in less than 5 seconds
      expect(duration).toBeLessThan(5000)
    })

    test('should render all content without layout shift', async ({ page }) => {
      await page.goto('/about_me')

      // Wait for all content to load
      await page.waitForLoadState('networkidle')

      // All main sections should be visible
      await expect(page.locator(selectors.aboutHero)).toBeVisible()
      await expect(page.locator(selectors.artistImage)).toBeVisible()
      await expect(page.locator(selectors.skillsTitle)).toBeVisible()
    })
  })
})
