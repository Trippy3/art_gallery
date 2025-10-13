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

#### Layout and Spacing
- **100vw padding** on both left and right sides
- Ensures first artwork (id: 8, rightmost) is fully visible initially
- Provides dramatic entrance effect as artworks scroll into view
- Timeline extends beyond viewport edges for extended line effect

#### Visual Elements
- **Timeline visualization** with horizontal line (accent/30 opacity)
- **Year markers** displayed on timeline with accent background
- **Timeline progress indicator** in top-left showing "History" label
- **Scroll hint** at bottom ("スクロールして作品を見る →") fades out after scrolling starts
- **Alternating layout**: Artworks alternate above/below the timeline

#### Components
- **Artwork cards** displayed along the timeline with staggered animations
- **Artwork data** is hardcoded in the component file (8 artworks, 2021-2024)

### Data Structure
Artworks are stored in an array within `horizontal-scroll-gallery.tsx`:
```typescript
{
  id: number,
  title: string,        // Japanese
  year: string,         // Display year
  description: string,  // Japanese
  image: string,        // Path to /public
  tags: string[]       // Japanese tags
}
```

## Navigation System

### Header Component (`components/header.tsx`)

#### Features
- **Fixed positioning** with backdrop blur and transparency
- **Hamburger menu** visible on all screen sizes
- **Responsive dropdown menu** with navigation links

#### Navigation Options
1. **About Me Link**: Direct link to `/about_me` page ("私について")
2. **Year Navigation**: Smooth scroll to specific years on timeline
   - 2024年, 2023年, 2022年, 2021年
   - Uses `scrollIntoView` with smooth behavior
   - Targets elements by ID: `year-${year}`
3. **Logo/Title**: Click "Aviary's Art Gallery" to return to top

#### Mobile Responsiveness
- Menu toggle with hamburger/close icons (lucide-react)
- Collapsible navigation panel
- Auto-closes menu after navigation action

## Artwork Detail Pages

### Dynamic Route: `/artwork/[id]`

#### Implementation (`app/artwork/[id]/page.tsx`)
- **Dynamic routing** using Next.js App Router
- **Parameter validation**: Uses `notFound()` for invalid IDs
- **Artwork data** duplicated in this file (should be synced with gallery)

#### Page Layout
- **Fixed header** with back button (using shadcn/ui Button)
  - "ギャラリーに戻る" with ArrowLeft icon
  - Links to home page
- **Two-column grid** (md breakpoint)
  - Left: Large artwork image (aspect-[3/4])
  - Right: Artwork details

#### Displayed Information
- Year badge (accent background)
- Title (large, 4xl-5xl font)
- Short description
- **Full description section** ("作品について")
- **Specifications** ("作品情報"):
  - 制作年 (year)
  - メディウム (medium): デジタルアート or ミックスメディア
  - サイズ (dimensions): Pixel dimensions
- **Tags** with pill styling

#### Extended Data Fields
Only available in detail page:
- `fullDescription`: Extended Japanese description (2-3 sentences)
- `medium`: Art medium/technique
- `dimensions`: Image dimensions in pixels

### 404 Handling
- Custom `not-found.tsx` component for invalid artwork IDs
- Graceful error handling with `notFound()` function

## About Me Page

### Route: `/about_me`

#### Page Structure (`app/about_me/page.tsx`)
Full-page layout with Header and Footer components.

#### Sections
1. **Hero Section**: 
   - Title: "私について"
   - Subtitle: "About Me"

2. **Profile Section**:
   - Artist portrait photo (artist-portrait-photo.jpg)
   - Artist name: "Aviary"
   - Bio text in Japanese (2 paragraphs)
   - Grid layout: image + text side-by-side

3. **Philosophy Section** ("制作理念"):
   - Two cards in grid:
     - "自然との対話" - Dialogue with nature
     - "抽象と具象の融合" - Fusion of abstract and concrete
   - Card styling with border and background

4. **Skills Section** ("スキル"):
   - 6 skills in responsive grid (2-3 columns)
   - Skills: デジタルペインティング, 3Dモデリング, コンセプトアート, カラーグレーディング, コンポジション, ビジュアルデザイン
   - Pill/badge styling

5. **Contact Section** ("お問い合わせ"):
   - Email button: "メールで連絡"
   - Social button: "SNSをフォロー"
   - Centered layout with call-to-action styling

## Artwork Card Interactions

### Interactive Features (`components/artwork-card.tsx`)

#### Animations
- **Scroll-based fade-in**: Opacity and scale based on scroll progress
  - Formula: `scrollProgress * 8 - index * 0.8` for staggered effect
  - Scale animation: 0.8 → 1.0
- **Hover effects**:
  - Image zoom on hover (scale-110)
  - Overlay gradient appears
  - Content slides up slightly on mobile

#### Hover States
- **Mobile**: Content always visible, subtle translation on hover
- **Desktop**: Content always visible, enhanced hover effects
- Smooth transitions (500-700ms duration)

#### Content Display
- Year badge (accent background, rounded pill)
- Title (xl-2xl font, balanced text)
- Description (fade-in on hover for mobile)
- Tags (fade-in on hover for mobile)
- "詳細を見る" button with ExternalLink icon
  - Opens in new tab (`target="_blank"`)
  - Links to `/artwork/${artwork.id}`

#### Dependencies
- Uses shadcn/ui Card and Button components
- lucide-react for icons (ExternalLink)
- Next.js Link and Image components

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
- **Client Components**: Marked with `"use client"` directive
  - `header.tsx` - Menu state management
  - `horizontal-scroll-gallery.tsx` - Scroll calculations
  - `artwork-card.tsx` - Hover state and animations
  - `theme-provider.tsx` - Theme context

### Component Categories

1. **Layout Components**
   - `header.tsx`: Navigation with year scrolling
   - `footer.tsx`: Footer section

2. **Content Components**
   - `hero.tsx`: Hero section with Japanese text
   - `horizontal-scroll-gallery.tsx`: Main gallery

3. **Reusable Components**
   - `artwork-card.tsx`: Individual artwork display with interactions
   - `components/ui/*`: shadcn/ui primitives (Button, Card, etc.)

4. **Provider Components**
   - `theme-provider.tsx`: Theme context

## Styling System

### Tailwind CSS v4
- Utility-first approach
- CSS variables for dynamic theming
- Custom variants for dark mode
- Animations via tailwindcss-animate
- Responsive design with mobile-first approach

### shadcn/ui Integration
- "new-york" style variant
- Radix UI primitives for accessibility
- Auto-generated components (do not edit manually)
- Lucide React icons (Menu, X, ArrowLeft, ExternalLink)

### Button Variants (shadcn/ui)
- **default**: Primary background
- **destructive**: Red/destructive styling
- **outline**: Border with transparent background
- **secondary**: Secondary color background
- **ghost**: Transparent with hover effect
- **link**: Underlined link styling

### Button Sizes
- **default**: h-9
- **sm**: h-8 (used for back button)
- **lg**: h-10
- **icon variants**: icon, icon-sm, icon-lg

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

## Data Synchronization Issue

### Important Note
Artwork data is duplicated in two locations:
1. `components/horizontal-scroll-gallery.tsx` - Basic info
2. `app/artwork/[id]/page.tsx` - Extended info

**These must be manually kept in sync** when adding/modifying artworks. Consider refactoring to a shared data source in the future.