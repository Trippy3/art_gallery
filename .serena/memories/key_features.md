# Key Features and Architecture

## Horizontal Scroll Gallery (Main Feature)

### Implementation Details
The core feature of this application is a horizontal-scrolling timeline implemented in `components/horizontal-scroll-gallery.tsx`.

#### Scroll-Jacking Technique
- **Converts vertical scroll to horizontal translation**
- Uses `position: sticky` for the container
- Content positioned absolutely within the sticky container
- Calculates scroll progress based on viewport position
- Applies `translateX` CSS transform for horizontal movement

#### Components
- **Timeline visualization** with year markers
- **Artwork cards** displayed along the timeline
- **Artwork data** is hardcoded in the component file

### Data Structure
Artworks are stored in an array within `horizontal-scroll-gallery.tsx`:
\`\`\`typescript
{
  id: number,
  title: string,        // Japanese
  year: number,
  description: string,  // Japanese
  image: string,        // Path to /public
  tags: string[]       // Japanese tags
}
\`\`\`

## Theme System

### Features
- **Dark/Light Mode**: Toggling via next-themes
- **CSS Variables**: OKLCH color space for all theme colors
- **Semantic Colors**: background, foreground, primary, secondary, muted, accent, destructive, border, input, ring
- **Chart Colors**: 5 predefined chart color variables

### Theme Provider
Wraps the application in `app/layout.tsx` using the custom `theme-provider.tsx` component.

## Component Architecture

### Server vs Client Components
- **Default**: React Server Components (RSC)
- **Client Components**: Marked with `"use client"` directive when needed
- **Interactive Components**: Use client components for state and browser APIs

### Component Categories

1. **Layout Components**
   - `header.tsx`: Navigation
   - `footer.tsx`: Footer section

2. **Content Components**
   - `hero.tsx`: Hero section with Japanese text
   - `horizontal-scroll-gallery.tsx`: Main gallery

3. **Reusable Components**
   - `artwork-card.tsx`: Individual artwork display
   - `components/ui/*`: shadcn/ui primitives

4. **Provider Components**
   - `theme-provider.tsx`: Theme context

## Styling System

### Tailwind CSS v4
- Utility-first approach
- CSS variables for dynamic theming
- Custom variants for dark mode
- Animations via tailwindcss-animate

### shadcn/ui Integration
- "new-york" style variant
- Radix UI primitives for accessibility
- Auto-generated components (do not edit manually)
- Lucide React icons

## Build Configuration

### Relaxed for Rapid Prototyping
The `next.config.mjs` has permissive settings:
- ESLint errors don't block builds
- TypeScript errors don't block builds
- Image optimization disabled

This supports the v0.app workflow for rapid iteration.

## v0.app Integration

### Auto-Sync
- Repository syncs automatically with v0.app
- Changes from v0.app are pushed to this repository
- Local changes may be overwritten
- Designed for visual-first development workflow
