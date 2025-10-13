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
\`\`\`typescript
// Use cn() utility for conditional classes
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)} />
\`\`\`

## Component Patterns

### File Naming
- **Lowercase with hyphens**: `horizontal-scroll-gallery.tsx`
- **Component names**: PascalCase (e.g., `HorizontalScrollGallery`)

### Component Structure
- **React Server Components (RSC)**: Default for components
- **Functional Components**: All components use function declarations
- **Export**: Default exports for page components, can use named exports for utilities

### Import Order Convention
1. External libraries (React, Next.js, etc.)
2. UI components from shadcn/ui
3. Local components
4. Utilities and helpers
5. Types

## shadcn/ui Integration

### Configuration
- **Style Variant**: "new-york"
- **RSC Mode**: Enabled
- **Icon Library**: Lucide React
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **No Prefix**: Empty string prefix

### Important Rules
- **DO NOT manually edit** components in `components/ui/`
- **Regenerate** using `npx shadcn@latest add [component-name]`
- Components are auto-generated and should remain pristine

## Language Conventions
- **UI Content**: Uses Japanese text (e.g., こんにちは, タイムライン)
- **Code Comments**: English
- **Variable Names**: English (camelCase)
- **Preserve Language**: Maintain Japanese content when modifying UI

## Next.js Patterns
- **App Router**: Uses Next.js 15 App Router architecture
- **Metadata**: Defined in layout.tsx
- **File-based Routing**: Follows Next.js conventions
- **Server Components**: Default, Client Components marked with `"use client"`

## Build Configuration
- **Relaxed Checks**: ESLint and TypeScript errors ignored during builds
- **Image Optimization**: Disabled (`unoptimized: true`)
- **Purpose**: Rapid prototyping setup for v0.app integration
