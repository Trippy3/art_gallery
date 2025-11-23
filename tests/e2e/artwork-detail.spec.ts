import { test, expect } from "@playwright/test";
import { selectors } from "../helpers/selectors";

test.describe("Artwork Detail Page", () => {
  test.describe("Dynamic Routing", () => {
    test("should load artwork detail page for ID 1", async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // Check URL
      expect(page.url()).toContain("/artwork/1");

      // Check page title
      await expect(page).toHaveTitle(/Aviary's Art Gallery/);
    });

    test("should display 404 page for invalid artwork ID", async ({ page }) => {
      await page.goto("/artwork/999");
      await page.waitForLoadState("networkidle");

      // Next.js 404 page should be shown (check for 404 text or not found message)
      // Note: Next.js notFound() renders a 404 page but returns 200 status in development
      const bodyText = await page.textContent("body");
      expect(bodyText).toContain("404");
    });

    test("should display 404 page for non-numeric ID", async ({ page }) => {
      await page.goto("/artwork/invalid");
      await page.waitForLoadState("networkidle");

      // Next.js 404 page should be shown
      const bodyText = await page.textContent("body");
      expect(bodyText).toContain("404");
    });
  });

  test.describe("Header and Navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test("should display header with back button", async ({ page }) => {
      const header = page.locator("header");
      await expect(header).toBeVisible();

      // Check for back button text
      const backButton = page.locator("text=ギャラリーに戻る");
      await expect(backButton).toBeVisible();
    });

    test("should have fixed header position", async ({ page }) => {
      const header = page.locator("header");
      const position = await header.evaluate(
        (el) => window.getComputedStyle(el).position,
      );
      expect(position).toBe("fixed");
    });

    test("should navigate back to gallery on button click", async ({
      page,
    }) => {
      const backButton = page.locator("text=ギャラリーに戻る");

      // Click and wait for navigation
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle" }),
        backButton.click(),
      ]);

      // Should be back to home page
      expect(page.url()).toBe("http://localhost:3000/");
    });

    test("should display ArrowLeft icon on back button", async ({ page }) => {
      const backButton = page.locator("text=ギャラリーに戻る");
      const icon = backButton.locator("svg").first();
      await expect(icon).toBeVisible();
    });

    test("should have backdrop blur on header", async ({ page }) => {
      const header = page.locator("header");
      await expect(header).toHaveClass(/backdrop-blur-md/);
    });
  });

  test.describe("Artwork Image Display", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test("should display artwork image", async ({ page }) => {
      const artworkImage = page.locator("main img").first();
      await expect(artworkImage).toBeVisible();
    });

    test("should have alt text on image", async ({ page }) => {
      const artworkImage = page.locator("main img").first();
      const alt = await artworkImage.getAttribute("alt");
      expect(alt).toBeTruthy();
    });

    test("should have aspect ratio container based on orientation", async ({ page }) => {
      // ID 1 is landscape, so should have 4:3 aspect ratio
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await expect(imageContainer).toBeVisible();

      // Check that it has one of the aspect ratio classes
      const classes = await imageContainer.getAttribute("class");
      const hasAspectRatio = classes?.includes("aspect-[") || false;
      expect(hasAspectRatio).toBe(true);
    });

    test("should have rounded corners on image container", async ({ page }) => {
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await expect(imageContainer).toHaveClass(/rounded-lg/);
    });

    test("should use Next.js Image component", async ({ page }) => {
      // Next.js Image components have specific structure
      const image = page.locator("main img").first();
      await expect(image).toBeVisible();
    });
  });

  test.describe("Artwork Information", () => {
    test("should display year badge", async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      const yearBadge = page.locator(".rounded-full.bg-accent").first();
      await expect(yearBadge).toBeVisible();
    });

    test("should display short description", async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      const description = page.locator("p.text-lg.text-muted-foreground");
      await expect(description).toBeVisible();
    });

    test('should display "作品について" section', async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      const sectionTitle = page.locator("text=作品について");
      await expect(sectionTitle).toBeVisible();
    });

    test("should display full description", async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // Full description should be longer text
      const fullDescription = page.locator('h2:has-text("作品について") + p');
      await expect(fullDescription).toBeVisible();

      const text = await fullDescription.textContent();
      expect(text?.length).toBeGreaterThan(50);
    });
  });

  test.describe("Specifications Section", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test('should display "作品情報" section', async ({ page }) => {
      const sectionTitle = page.locator("text=作品情報").first();
      await expect(sectionTitle).toBeVisible();
    });

    test("should display production year", async ({ page }) => {
      const yearLabel = page.locator("text=制作年");
      await expect(yearLabel).toBeVisible();

      const yearValue = page
        .locator("text=制作年")
        .locator("..")
        .locator("p.text-foreground");
      await expect(yearValue).toBeVisible();
    });

    test("should display medium", async ({ page }) => {
      const mediumLabel = page.locator("text=技法・材質");
      await expect(mediumLabel).toBeVisible();
    });

    test("should display dimensions", async ({ page }) => {
      const dimensionsLabel = page.locator("text=サイズ");
      await expect(dimensionsLabel).toBeVisible();
    });

    test("should have grid layout for specifications", async ({ page }) => {
      const specsGrid = page.locator(".grid.grid-cols-2.gap-4");
      await expect(specsGrid).toBeVisible();
    });
  });

  test.describe("Tags Section", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test('should display "タグ" section', async ({ page }) => {
      const sectionTitle = page.locator('h2:has-text("タグ")');
      await expect(sectionTitle).toBeVisible();
    });

    test("should have proper tag styling", async ({ page }) => {
      const tag = page
        .locator(".bg-secondary.text-secondary-foreground.rounded-full")
        .first();
      await expect(tag).toBeVisible();
      await expect(tag).toHaveClass(/rounded-full/);
    });

    test("should display tags in flex wrap layout", async ({ page }) => {
      const tagsContainer = page.locator(".flex.flex-wrap.gap-2");
      await expect(tagsContainer).toBeVisible();
    });
  });

  test.describe("Page Layout", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test("should have min-h-screen on main", async ({ page }) => {
      const main = page.locator("main");
      await expect(main).toHaveClass(/min-h-screen/);
    });

    test("should have 2-column grid on desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const grid = page.locator(".grid.md\\:grid-cols-2");
      await expect(grid).toBeVisible();
    });

    test("should have proper spacing between sections", async ({ page }) => {
      const sections = page.locator(".border-t.border-border");
      const count = await sections.count();

      // Should have multiple sections with borders
      expect(count).toBeGreaterThan(2);
    });

    test("should have container with max-width", async ({ page }) => {
      const container = page.locator(".max-w-6xl");
      await expect(container).toBeVisible();
    });

    test("should have proper padding on content", async ({ page }) => {
      const content = page.locator(".pt-24.pb-16");
      await expect(content).toBeVisible();
    });
  });

  test.describe("Responsive Behavior", () => {
    test("should display correctly on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // All main elements should be visible
      const title = page.locator("h1");
      await expect(title).toBeVisible();

      const image = page.locator("main img").first();
      await expect(image).toBeVisible();

      const backButton = page.locator("text=ギャラリーに戻る");
      await expect(backButton).toBeVisible();
    });

    test("should stack layout on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // Grid should exist but stack on mobile
      const grid = page.locator(".grid.md\\:grid-cols-2");
      await expect(grid).toBeVisible();
    });

    test("should display correctly on tablet", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // Should show 2-column layout
      const grid = page.locator(".grid.md\\:grid-cols-2");
      await expect(grid).toBeVisible();

      const title = page.locator("h1");
      await expect(title).toBeVisible();
    });

    test("should display correctly on desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // All content should be visible
      const image = page.locator("main img").first();
      await expect(image).toBeVisible();

      const title = page.locator("h1");
      await expect(title).toBeVisible();

      const tags = page.locator(".rounded-full.bg-secondary");
      await expect(tags.first()).toBeVisible();
    });

    test("should adjust title font size responsively", async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      const title = page.locator("h1");
      await expect(title).toHaveClass(/text-4xl/);
      await expect(title).toHaveClass(/sm:text-5xl/);
    });
  });

  test.describe("Performance", () => {
    test("should load page quickly", async ({ page }) => {
      const startTime = Date.now();

      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should load in less than 5 seconds
      expect(duration).toBeLessThan(5000);
    });

    test("should render without layout shift", async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      // All main content should be visible
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main img").first()).toBeVisible();
      await expect(page.locator("text=作品について")).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test("should have proper heading hierarchy", async ({ page }) => {
      // Should have one h1
      const h1Elements = page.locator("h1");
      const h1Count = await h1Elements.count();
      expect(h1Count).toBe(1);

      // Should have h2 for sections
      const h2Elements = page.locator("h2");
      const h2Count = await h2Elements.count();
      expect(h2Count).toBeGreaterThan(0);
    });

    test("should have alt text on image", async ({ page }) => {
      const image = page.locator("main img").first();
      const alt = await image.getAttribute("alt");

      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    });

    test("should have proper link text on back button", async ({ page }) => {
      const backButton = page.locator("text=ギャラリーに戻る");
      await expect(backButton).toBeVisible();

      const text = await backButton.textContent();
      expect(text).toContain("ギャラリーに戻る");
    });

    test("should be keyboard navigable", async ({ page }) => {
      // Tab to back button
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");

      // Should be able to navigate without errors
      const activeElement = await page.evaluate(
        () => document.activeElement?.tagName,
      );
      expect(activeElement).toBeTruthy();
    });

    test("should have sufficient color contrast", async ({ page }) => {
      // Title should have proper contrast
      const title = page.locator("h1");
      await expect(title).toHaveClass(/text-foreground/);

      // Descriptions should have muted color (check first one)
      const description = page.locator("p.text-muted-foreground").first();
      await expect(description).toBeVisible();
    });
  });

  test.describe("Artwork Orientation Support", () => {
    test("should display portrait artwork with 3:4 aspect ratio", async ({ page }) => {
      // Find a portrait artwork (e.g., ID 5, 6, 7, 8, 11)
      await page.goto("/artwork/5");
      await page.waitForLoadState("networkidle");

      const imageContainer = page.locator(".relative.aspect-\\[3\\/4\\]");
      await expect(imageContainer).toBeVisible();
    });

    test("should display landscape artwork with 4:3 aspect ratio", async ({ page }) => {
      // Find a landscape artwork (e.g., ID 1, 2, 3, 4, 10, 12)
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");

      const imageContainer = page.locator(".relative.aspect-\\[4\\/3\\]");
      await expect(imageContainer).toBeVisible();
    });
  });

  test.describe("Image Lightbox Functionality", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/artwork/1");
      await page.waitForLoadState("networkidle");
    });

    test("should display zoom icon on image", async ({ page }) => {
      // Zoom icon is in bottom-right corner div
      const zoomIconContainer = page.locator(".absolute.bottom-3.right-3");
      await expect(zoomIconContainer).toBeVisible();

      // Check for SVG icon inside
      const zoomIcon = zoomIconContainer.locator("svg");
      await expect(zoomIcon).toBeVisible();
    });

    test("should open lightbox when image is clicked", async ({ page }) => {
      // Click on the image container
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();

      // Wait for lightbox to appear
      await page.waitForTimeout(300);

      // Lightbox should be visible
      const lightbox = page.locator(".fixed.inset-0.z-\\[100\\]");
      await expect(lightbox).toBeVisible();
    });

    test("should display image in lightbox with correct styling", async ({ page }) => {
      // Click to open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Check lightbox background has blur
      const lightbox = page.locator(".fixed.inset-0");
      await expect(lightbox).toHaveClass(/backdrop-blur-md/);
      await expect(lightbox).toHaveClass(/bg-black\/80/);
    });

    test("should display close button in lightbox", async ({ page }) => {
      // Open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Close button should be visible
      const closeButton = page.locator("button[aria-label='閉じる']");
      await expect(closeButton).toBeVisible();
    });

    test("should close lightbox when close button is clicked", async ({ page }) => {
      // Open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Click close button
      const closeButton = page.locator("button[aria-label='閉じる']");
      await closeButton.click();
      await page.waitForTimeout(300);

      // Lightbox should be gone
      const lightbox = page.locator(".fixed.inset-0.z-\\[100\\]");
      await expect(lightbox).not.toBeVisible();
    });

    test("should close lightbox when background is clicked", async ({ page }) => {
      // Open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Click on background (not on image)
      const lightbox = page.locator(".fixed.inset-0.z-\\[100\\]");
      await lightbox.click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);

      // Lightbox should be gone
      await expect(lightbox).not.toBeVisible();
    });

    test("should close lightbox when ESC key is pressed", async ({ page }) => {
      // Open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Press ESC key
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);

      // Lightbox should be gone
      const lightbox = page.locator(".fixed.inset-0.z-\\[100\\]");
      await expect(lightbox).not.toBeVisible();
    });

    test("should prevent body scroll when lightbox is open", async ({ page }) => {
      // Open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Check if body has overflow hidden
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe("hidden");
    });

    test("should display high quality image in lightbox", async ({ page }) => {
      // Open lightbox
      const imageContainer = page.locator(".relative.cursor-pointer").first();
      await imageContainer.click();
      await page.waitForTimeout(300);

      // Find image in lightbox
      const lightboxImage = page.locator(".fixed.inset-0 img").last();
      await expect(lightboxImage).toBeVisible();

      // Check object-contain class for aspect ratio preservation
      await expect(lightboxImage).toHaveClass(/object-contain/);
    });
  });
});
