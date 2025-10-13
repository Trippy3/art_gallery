# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled
- **Target**: ES6
- **Module**: ESNext with bundler resolution
- **JSX**: preserve mode for Next.js
- **Key Features**:
  - `skipLibCheck: true`
  - `noEmit: true`
  - `isolatedModules: true`
  - `resolveJsonModule: true`

## Styling Approach

### Tailwind CSS
- **Primary Method**: Utility classes for all styling
- **Version**: v4.1.9 with PostCSS integration
- **CSS Variables**: Used for theme colors (defined in `app/globals.css`)
- **Custom Variants**: Dark mode using `@custom-variant dark (&:is(.dark *))`

### Theme System
- **Colors**: Defined using OKLCH color space in CSS variables
- **Light/Dark Mode**: Managed by next-themes
- **CSS Variables**: Root-level variables for light mode, `.dark` class for dark mode
- **Shadcn Colors**: Includes semantic colors (background, foreground, primary, secondary, muted, accent, destructive, border, input, ring, chart-1 through chart-5)

### Component Styling Pattern
```typescript
// Use cn() utility for conditional classes
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)} />
```

### Common Styling Patterns

#### Responsive Layout
```typescript
// Mobile-first breakpoints
className="grid md:grid-cols-2 gap-8 lg:gap-12"
className="text-xl sm:text-2xl"
className="px-4 sm:px-6 lg:px-8"
```

#### Container Patterns
```typescript
// Standard container
className="container mx-auto px-4 sm:px-6 lg:px-8"

// Max-width containers
className="max-w-4xl"  // About page
className="max-w-6xl"  // Artwork detail page
```

#### Card/Section Styling
```typescript
// Card with border
className="p-6 rounded-lg bg-card border border-border"

// Sections with spacing
className="space-y-6 py-8"
```

#### Interactive Elements
```typescript
// Hover states
className="hover:bg-accent hover:text-accent-foreground transition-colors"

// Focus states (from button variants)
className="outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
```

## Component Patterns

### File Naming
- **Lowercase with hyphens**: `horizontal-scroll-gallery.tsx`
- **Brackets for dynamic routes**: `[id]` in directory names
- **Component names**: PascalCase (e.g., `HorizontalScrollGallery`, `AboutMePage`)

### Component Structure
- **React Server Components (RSC)**: Default for pages and static components
- **Client Components**: Marked with `"use client"` at top of file
  - Use for: state management, browser APIs, event handlers, hooks
- **Functional Components**: All components use function declarations or arrow functions
- **Export**: Default exports for page components, named exports for reusable components

### Import Order Convention
1. React and Next.js imports
   ```typescript
   import { useState } from "react"
   import Image from "next/image"
   import Link from "next/link"
   ```
2. Third-party libraries
   ```typescript
   import { Menu, X } from "lucide-react"
   ```
3. UI components from shadcn/ui
   ```typescript
   import { Button } from "@/components/ui/button"
   import { Card } from "@/components/ui/card"
   ```
4. Local components
   ```typescript
   import { Header } from "@/components/header"
   import { ArtworkCard } from "./artwork-card"
   ```
5. Utilities and helpers
   ```typescript
   import { cn } from "@/lib/utils"
   ```
6. Types and interfaces (if separate file)

### Client Component Pattern
```typescript
"use client"

import { useState } from "react"

export function ComponentName() {
  const [state, setState] = useState(initialValue)
  
  return (
    // JSX
  )
}
```

### Page Component Pattern
```typescript
// Server Component (no "use client")
export default function PageName() {
  return (
    <main className="min-h-screen bg-background">
      {/* Content */}
    </main>
  )
}
```

### Dynamic Route Pattern
```typescript
// With params type
export default function PageName({ params }: { params: { id: string } }) {
  const id = params.id
  // Validation
  if (!data) {
    notFound()
  }
  return (/* JSX */)
}
```

## State Management Patterns

### Local State
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [isHovered, setIsHovered] = useState(false)
```

### Refs for DOM Access
```typescript
const containerRef = useRef<HTMLDivElement>(null)
const scrollRef = useRef<HTMLDivElement>(null)
```

### Event Handlers
```typescript
// Arrow function for inline handlers
onClick={() => setIsMenuOpen(!isMenuOpen)}

// Named function for complex handlers
const handleScroll = () => {
  // Complex logic
}

useEffect(() => {
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])
```

## Animation Patterns

### Transition Classes
```typescript
className="transition-all duration-500"
className="transition-opacity duration-500"
className="transition-transform duration-700"
className="transition-colors"  // Duration auto-determined
```

### Transform Animations
```typescript
// Scale
style={{ transform: `scale(${0.8 + progress * 0.2})` }}

// Translate
style={{ transform: `translateX(${translateX}px)` }}

// Combined with opacity
style={{ opacity: progress, transform: `scale(${scale})` }}
```

### Conditional Animations
```typescript
className={`transition-opacity duration-500 ${
  isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
}`}
```

### Tailwind Animation Classes
```typescript
className="animate-bounce"  // For scroll hints
```

## shadcn/ui Integration

### Configuration
- **Style Variant**: "new-york"
- **RSC Mode**: Enabled
- **Icon Library**: Lucide React
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **No Prefix**: Empty string prefix

### Component Usage Patterns
```typescript
// Button variants
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>
<Button variant="link">Link Style</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Normal</Button>
<Button size="lg">Large</Button>

// With icons
<Button size="sm">
  <ArrowLeft className="mr-2 h-4 w-4" />
  Back
</Button>
```

### Important Rules
- **DO NOT manually edit** components in `components/ui/`
- **Regenerate** using `npx shadcn@latest add [component-name]`
- Components are auto-generated and should remain pristine
- Customize by wrapping or extending, not modifying

## Icon Usage (Lucide React)

### Icon Import Pattern
```typescript
import { Menu, X, ArrowLeft, ExternalLink } from "lucide-react"
```

### Icon Sizing
```typescript
<Menu size={24} />  // Explicit size
<ArrowLeft className="h-4 w-4" />  // Tailwind classes
<ExternalLink className="ml-2 h-4 w-4" />  // With margin
```

## Link and Navigation Patterns

### Next.js Link
```typescript
import Link from "next/link"

// Internal navigation
<Link href="/about_me">About Me</Link>

// With styling
<Link 
  href="/"
  className="text-foreground hover:text-foreground/80 transition-colors"
>
  Home
</Link>

// With button styling
<Link href={`/artwork/${id}`} target="_blank" rel="noopener noreferrer">
  <Button>View Details</Button>
</Link>
```

### Smooth Scroll Navigation
```typescript
const scrollToYear = (year: number) => {
  const element = document.getElementById(`year-${year}`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}
```

## Image Patterns

### Next.js Image
```typescript
import Image from "next/image"

// Fill container
<div className="relative aspect-square">
  <Image 
    src="/path/to/image.jpg" 
    alt="Description"
    fill
    className="object-cover"
  />
</div>

// With fallback
src={artwork.image || "/placeholder.svg"}
```

### Image Container Patterns
```typescript
// Square aspect ratio
className="relative aspect-square rounded-lg overflow-hidden"

// Portrait aspect ratio
className="relative aspect-[3/4] rounded-lg overflow-hidden"

// With background
className="relative aspect-square bg-muted"
```

## Language Conventions
- **UI Content**: Uses Japanese text (e.g., こんにちは, タイムライン, 私について, 詳細を見る)
- **Code Comments**: English
- **Variable Names**: English (camelCase)
- **Component Names**: English (PascalCase)
- **Preserve Language**: Maintain Japanese content when modifying UI

## Next.js App Router Patterns

### Page Exports
```typescript
// Default export for pages
export default function PageName() { }

// Metadata export (optional)
export const metadata = { /* */ }
```

### Dynamic Routes
- Use brackets for dynamic segments: `[id]`
- Access via params prop
- Validate and handle not found cases

### Error Handling
```typescript
import { notFound } from "next/navigation"

if (!data) {
  notFound()
}
```

## Data Patterns

### Hardcoded Data Arrays
```typescript
const artworks = [
  {
    id: 1,
    title: "Title",
    year: "2021",
    // ... other fields
  },
  // ...
]
```

### Array Manipulation
```typescript
// Reverse for display order
const reversedArtworks = [...artworks].reverse()

// Extract unique values
const years = Array.from(new Set(artworks.map((a) => a.year))).sort()

// Find by ID
const artwork = artworks.find((a) => a.id === Number.parseInt(params.id))
```

## Accessibility Patterns

### ARIA Labels
```typescript
<button aria-label="メニュー">
  <Menu />
</button>
```

### Semantic HTML
- Use `<main>`, `<header>`, `<section>`, `<nav>` appropriately
- Proper heading hierarchy (h1, h2, h3)

### Focus States
- Visible focus indicators (from shadcn/ui button variants)
- Keyboard navigation support

## Build Configuration
- **Relaxed Checks**: ESLint and TypeScript errors ignored during builds
- **Image Optimization**: Disabled (`unoptimized: true`)
- **Purpose**: Rapid prototyping setup for v0.app integration

## Code Formatting
- **Semicolons**: Inconsistent (some files use, some don't)
- **Quotes**: Double quotes preferred
- **Trailing Commas**: Present in arrays/objects
- **Indentation**: 2 spaces
- **Line Length**: No strict limit, but reasonable wrapping