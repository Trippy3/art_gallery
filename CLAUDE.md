# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio/art gallery application auto-synced with v0.app deployments. The project showcases artworks in a unique horizontal-scrolling timeline interface.

## Development Commands

\`\`\`bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
\`\`\`

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **React**: v19
- **TypeScript**: v5 with strict mode enabled
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Package Manager**: pnpm

## Project Structure

\`\`\`
app/
  ├── layout.tsx          # Root layout with theme provider
  ├── page.tsx            # Main page composing all sections
  └── globals.css         # Global styles and CSS variables

components/
  ├── ui/                 # shadcn/ui components (auto-generated)
  ├── header.tsx          # Navigation header
  ├── hero.tsx            # Hero section with Japanese text
  ├── horizontal-scroll-gallery.tsx  # Main gallery feature
  ├── artwork-card.tsx    # Individual artwork display
  ├── footer.tsx          # Footer component
  └── theme-provider.tsx  # Dark/light theme wrapper

lib/                      # Utility functions (e.g., cn helper)
public/                   # Static assets (images)
\`\`\`

## Architecture Patterns

### Path Aliases
The project uses `@/` alias for all imports, configured in `tsconfig.json`:
\`\`\`typescript
import { Component } from "@/components/component"
\`\`\`

### Component Organization
- **Layout components**: `header.tsx`, `footer.tsx` - Static UI elements
- **Feature components**: `horizontal-scroll-gallery.tsx` - Complex interactive features
- **UI components**: `components/ui/*` - Reusable shadcn/ui primitives
- **Provider components**: `theme-provider.tsx` - Context providers

### Horizontal Scroll Gallery
The main feature uses a scroll-jacking technique:
- Converts vertical scroll into horizontal translation
- Uses `position: sticky` container with absolute positioned content
- Calculates scroll progress based on viewport position
- Applies `translateX` transform for horizontal movement
- Timeline visualization with year markers (YYYY-MM format)
- Artwork data is centralized in `lib/data/artworks.ts`
- Supports both portrait and landscape artwork orientations with dynamic card sizing

### Styling Approach
- Tailwind utility classes for all styling
- CSS variables for theme colors (defined in `globals.css`)
- `next-themes` for dark/light mode support
- `cn()` utility from `lib/utils` for conditional classes

### shadcn/ui Integration
- Configuration in `components.json`
- Components use "new-york" style variant
- RSC-compatible components
- Lucide React for icons (ArrowLeft, X, ZoomIn, ExternalLink, etc.)
- UI components should not be manually edited (regenerate with `npx shadcn@latest add`)

### Artwork Orientation Support
The application supports both portrait and landscape artwork displays:
- **Portrait artworks**: 3:4 aspect ratio, smaller width (280-400px on cards, aspect-[3/4] on detail pages)
- **Landscape artworks**: 4:3 aspect ratio, wider dimensions (400-600px on cards, aspect-[4/3] on detail pages)
- Orientation is manually set in the artwork data (`orientation: "portrait" | "landscape"`)
- Both gallery cards and detail pages adapt dynamically to artwork orientation
- Card sizes: Portrait (280×400 to 400×550px), Landscape (400×300 to 600×450px)

### Image Lightbox Feature
Detail pages include a lightbox modal for viewing full-resolution images:
- Click on the artwork image or the zoom icon (bottom-right corner) to open lightbox
- Lightbox displays image with preserved aspect ratio using `object-contain`
- Background: black/80 with backdrop blur for focus
- Close methods: ESC key, background click, or X button in top-right
- Body scroll is prevented when lightbox is open
- Mobile-friendly with zoom icon always visible (no hover-only UI)
- High-quality image rendering (quality={100})

## Important Notes

### Build Configuration
`next.config.mjs` has relaxed checks:
- `ignoreDuringBuilds: true` for ESLint
- `ignoreBuildErrors: true` for TypeScript
- `unoptimized: true` for images

This is v0.app's default setup for rapid prototyping.

### v0.app Sync
This repository auto-syncs with v0.app. Changes made on v0.app are pushed here automatically. Local changes should be carefully considered as they may be overwritten.

### Content Language
The UI includes Japanese text (こんにちは, タイムライン, etc.). Preserve language choices when modifying content.

### Adding Artworks
To add artworks, edit the `artworks` array in `lib/data/artworks.ts`. Each artwork requires:
- `id`: Unique number
- `title`: Artwork name (Japanese)
- `year`: Display year in YYYY-MM format (e.g., "2024-03")
- `description`: Brief description (Japanese)
- `image`: Path to image in `/public`
- `tags`: Array of tag strings (Japanese)
- `fullDescription`: Detailed description for detail page (Japanese)
- `medium`: Medium/technique (e.g., "油彩／カンヴァス")
- `dimensions`: Dimensions (e.g., "F6", "M12", "P15")
- `orientation`: Either "portrait" (縦長) or "landscape" (横長) - manually set based on artwork aspect ratio

### Theme Customization
Theme colors are defined using CSS variables in `app/globals.css`. Modify the `:root` and `.dark` selectors to change the color scheme.
