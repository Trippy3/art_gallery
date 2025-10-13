# Project Overview

## Purpose
This is a Next.js 15 portfolio/art gallery application that showcases artworks in a unique horizontal-scrolling timeline interface. The application features an artist profile page, individual artwork detail pages, and year-based navigation. The project is auto-synced with v0.app deployments and features Japanese language content.

## Tech Stack

### Core Framework & Libraries
- **Framework**: Next.js 15.2.4 with App Router
- **React**: v19
- **TypeScript**: v5 with strict mode enabled
- **Node.js**: Requires compatible version for Next.js 15

### Styling
- **Tailwind CSS**: v4.1.9 with CSS variables
- **UI Components**: shadcn/ui ("new-york" style variant)
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Theme System**: next-themes (latest) for dark/light mode
- **Icons**: Lucide React v0.454.0
- **Animations**: tailwindcss-animate and tw-animate-css

### Additional Libraries
- **Form Handling**: react-hook-form v7.60.0 with hookform/resolvers
- **Validation**: Zod v3.25.67
- **Date Handling**: date-fns v4.1.0
- **Carousel**: embla-carousel-react v8.5.1
- **Charts**: recharts v2.15.4
- **Toast Notifications**: sonner v1.7.4
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Analytics**: @vercel/analytics
- **Fonts**: geist (sans and mono)

### Package Manager
- **pnpm**: Used for dependency management

## Application Features

### Main Pages
1. **Home Page** (`/`)
   - Hero section with Japanese introduction
   - Horizontal scroll gallery with timeline (2021-2024)
   - 8 artworks displayed along timeline
   - Interactive year-based navigation

2. **About Me Page** (`/about_me`)
   - Artist profile with photo
   - Philosophy and creative approach
   - Skills showcase
   - Contact information

3. **Artwork Detail Pages** (`/artwork/[id]`)
   - Individual artwork pages (8 artworks)
   - Full artwork images
   - Extended descriptions
   - Technical specifications (medium, dimensions)
   - Tags display
   - Back navigation to gallery

### Key Interactions
- **Horizontal Scroll**: Vertical scrolling translates to horizontal gallery movement
- **Year Navigation**: Header menu allows jumping to specific years
- **Artwork Viewing**: Click artworks to view full details in new tab
- **Responsive Design**: Mobile-first approach with breakpoints
- **Theme Switching**: Dark/light mode support

## Project Type
Multi-page application (MPA) with server-side rendering capabilities, focused on visual presentation of artwork in a timeline format with horizontal scrolling mechanics. Uses Next.js App Router for file-based routing and dynamic routes.

## Artist Information
- **Artist Name**: Aviary
- **Art Period**: 2021-2024
- **Art Style**: Digital art, mixed media, abstract, minimalism
- **Themes**: Nature-technology fusion, color harmony, organic forms, light and shadow

## Content Language
- **UI Language**: Primarily Japanese with some English labels
- **Code**: English comments and variable names
- **Artist Content**: Japanese descriptions and titles