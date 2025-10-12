# Code Structure

## Directory Layout

```
art_gallery/
├── app/
│   ├── layout.tsx          # Root layout with theme provider and metadata
│   ├── page.tsx            # Main page composing all sections (Home component)
│   └── globals.css         # Global styles, CSS variables, Tailwind imports
├── components/
│   ├── ui/                 # shadcn/ui auto-generated components
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section with Japanese text
│   ├── horizontal-scroll-gallery.tsx  # Main gallery feature with scroll-jacking
│   ├── artwork-card.tsx    # Individual artwork display component
│   ├── footer.tsx          # Footer component
│   └── theme-provider.tsx  # Dark/light theme wrapper component
├── lib/                    # Utility functions (e.g., cn helper)
├── public/                 # Static assets (images)
├── styles/                 # Additional style files
├── .claude/                # Claude Code configuration
├── .serena/                # Serena MCP server data
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.mjs         # Next.js configuration
├── components.json         # shadcn/ui configuration
└── CLAUDE.md               # Project documentation for Claude Code
```

## Key Components

### Layout Components
- **header.tsx**: Static navigation header
- **footer.tsx**: Footer section

### Feature Components
- **horizontal-scroll-gallery.tsx**: Core feature using scroll-jacking technique
  - Converts vertical scroll to horizontal translation
  - Uses `position: sticky` container with absolute positioned content
  - Timeline visualization with year markers
  - Artwork data is hardcoded in this file
- **hero.tsx**: Hero section with Japanese language content
- **artwork-card.tsx**: Reusable card for displaying individual artworks

### Provider Components
- **theme-provider.tsx**: Context provider for dark/light theme switching

### UI Components
- **components/ui/**: Auto-generated shadcn/ui components (should not be manually edited)

## Path Aliases
All imports use `@/` alias pointing to the project root:
```typescript
import { Component } from "@/components/component"
```

Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```