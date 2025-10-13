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
- Timeline visualization with year markers
- Artwork data is hardcoded in `horizontal-scroll-gallery.tsx`

### Styling Approach
- Tailwind utility classes for all styling
- CSS variables for theme colors (defined in `globals.css`)
- `next-themes` for dark/light mode support
- `cn()` utility from `lib/utils` for conditional classes

### shadcn/ui Integration
- Configuration in `components.json`
- Components use "new-york" style variant
- RSC-compatible components
- Lucide React for icons
- UI components should not be manually edited (regenerate with `npx shadcn@latest add`)

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
To add artworks, edit the `artworks` array in `components/horizontal-scroll-gallery.tsx`. Each artwork requires:
- `id`: Unique number
- `title`: Artwork name (Japanese)
- `year`: Display year
- `description`: Brief description (Japanese)
- `image`: Path to image in `/public`
- `tags`: Array of tag strings (Japanese)

### Theme Customization
Theme colors are defined using CSS variables in `app/globals.css`. Modify the `:root` and `.dark` selectors to change the color scheme.
