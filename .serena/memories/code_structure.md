# Code Structure

## Directory Layout

```
art_gallery/
├── app/
│   ├── layout.tsx                    # Root layout with theme provider and metadata
│   ├── page.tsx                      # Main page composing all sections (Home component)
│   ├── globals.css                   # Global styles, CSS variables, Tailwind imports
│   ├── about_me/
│   │   └── page.tsx                  # About Me page (artist profile, philosophy, skills)
│   └── artwork/
│       └── [id]/
│           ├── page.tsx              # Dynamic artwork detail page
│           └── not-found.tsx         # 404 page for invalid artwork IDs
├── components/
│   ├── ui/                           # shadcn/ui auto-generated components
│   │   ├── button.tsx                # Button component (shadcn/ui)
│   │   ├── card.tsx                  # Card component (shadcn/ui)
│   │   └── ...                       # Other shadcn/ui components
│   ├── header.tsx                    # Navigation header with year scrolling
│   ├── hero.tsx                      # Hero section with Japanese text
│   ├── horizontal-scroll-gallery.tsx # Main gallery feature with scroll-jacking
│   ├── artwork-card.tsx              # Individual artwork display with link to detail
│   ├── footer.tsx                    # Footer component
│   └── theme-provider.tsx            # Dark/light theme wrapper component
├── lib/                              # Utility functions (e.g., cn helper)
├── public/                           # Static assets (images)
│   ├── artist-portrait-photo.jpg     # Artist profile photo
│   └── *.jpg                         # Artwork images
├── styles/                           # Additional style files
├── .claude/                          # Claude Code configuration
├── .serena/                          # Serena MCP server data
│   └── memories/                     # Project memory files
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.mjs                   # Next.js configuration
├── components.json                   # shadcn/ui configuration
└── CLAUDE.md                         # Project documentation for Claude Code
```

## Routing Structure

### Static Routes
- `/` - Main page with hero and horizontal scroll gallery
- `/about_me` - Artist profile page (Aviary)

### Dynamic Routes
- `/artwork/[id]` - Individual artwork detail page (id: 1-8)
  - Displays full artwork information
  - Shows fullDescription, medium, dimensions
  - Includes back button to gallery

### 404 Handling
- `/artwork/[id]/not-found.tsx` - Custom 404 for invalid artwork IDs

## Key Components

### Layout Components
- **header.tsx**: Static navigation header with:
  - Hamburger menu (visible on all screen sizes)
  - Link to "私について" (About Me) page
  - Year-based navigation (2021-2024) with smooth scroll
  - Mobile-responsive collapsible menu
- **footer.tsx**: Footer section

### Feature Components
- **horizontal-scroll-gallery.tsx**: Core feature using scroll-jacking technique
  - Converts vertical scroll to horizontal translation
  - Uses `position: sticky` container with absolute positioned content
  - Timeline visualization with year markers
  - **100vw padding** on left and right for proper artwork display
  - Artwork data is hardcoded in this file
  - Timeline indicator labeled "History"
- **hero.tsx**: Hero section with Japanese language content
- **artwork-card.tsx**: Reusable card for displaying individual artworks
  - Interactive hover effects
  - Staggered fade-in animations based on scroll progress
  - Link to detail page with "詳細を見る" button
  - Opens in new tab for detail view
  - Uses shadcn/ui Button and Card components

### Page Components
- **app/page.tsx**: Main home page composing all sections
- **app/about_me/page.tsx**: Artist profile page featuring:
  - Profile photo and bio
  - Philosophy section (自然との対話, 抽象と具象の融合)
  - Skills grid (6 skills)
  - Contact section with email and social links
- **app/artwork/[id]/page.tsx**: Dynamic artwork detail page
  - Full-screen artwork image
  - Extended description (fullDescription)
  - Technical specs (medium, dimensions, year)
  - Tags display
  - Back button to gallery

### Provider Components
- **theme-provider.tsx**: Context provider for dark/light theme switching

### UI Components (shadcn/ui)
- **components/ui/button.tsx**: Button component with variants (default, destructive, outline, secondary, ghost, link) and sizes
- **components/ui/card.tsx**: Card container component
- **components/ui/**: Other auto-generated shadcn/ui components (should not be manually edited)

## Data Management

### Artwork Data Structure
Artwork data is duplicated in two files:
1. **components/horizontal-scroll-gallery.tsx**: Basic artwork info (8 items)
2. **app/artwork/[id]/page.tsx**: Extended artwork info with additional fields:
   - `fullDescription`: Detailed artwork description
   - `medium`: Art medium (デジタルアート, ミックスメディア)
   - `dimensions`: Pixel dimensions (e.g., "3000 x 2000 px")

**Note**: These two data sources should be kept in sync manually.

## Path Aliases
All imports use `@/` alias pointing to the project root:
```typescript
import { Component } from "@/components/component"
import { Button } from "@/components/ui/button"
```

Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```