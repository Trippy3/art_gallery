# Task Completion Checklist

## When a coding task is completed, perform the following:

### 1. Code Quality (Optional)
While the project has relaxed build checks, you may optionally run:
\`\`\`bash
pnpm lint
\`\`\`

**Note**: The project configuration (`next.config.mjs`) has:
- `eslint.ignoreDuringBuilds: true`
- `typescript.ignoreBuildErrors: true`

This means builds will succeed even with linting or TypeScript errors. Manual linting is optional.

### 2. Local Testing
\`\`\`bash
# Test in development mode
pnpm dev
# Visit http://localhost:3000 to verify changes
\`\`\`

### 3. Build Verification
\`\`\`bash
# Verify production build works
pnpm build

# Test production server
pnpm start
\`\`\`

### 4. Component-Specific Checks

#### If shadcn/ui components were modified:
- **NEVER manually edit** files in `components/ui/`
- If changes are needed, regenerate with: `npx shadcn@latest add [component-name]`

#### If horizontal-scroll-gallery was modified:
- Test scroll behavior in browser
- Verify timeline year markers render correctly
- Check artwork data integrity

#### If theme/styling was changed:
- Test both light and dark modes
- Verify CSS variable changes in `app/globals.css`
- Check color contrast and accessibility

### 5. v0.app Sync Awareness
**Important**: This repository auto-syncs with v0.app
- Changes made on v0.app may overwrite local changes
- Document significant local modifications
- Be aware of potential conflicts

### 6. Content Integrity
- **Japanese Text**: Ensure Japanese content (こんにちは, タイムライン, etc.) is preserved
- **Image Paths**: Verify paths to `/public` directory are correct
- **Artwork Data**: Check artwork array structure in `horizontal-scroll-gallery.tsx`

### 7. Git Workflow (Standard)
\`\`\`bash
# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Descriptive commit message"

# Push to remote (if needed)
git push
\`\`\`

## Testing Priorities

### High Priority
1. Visual regression testing (manual browser check)
2. Horizontal scroll functionality
3. Dark/light mode switching
4. Responsive layout

### Medium Priority
1. Production build success
2. Image loading
3. Navigation functionality

### Low Priority (Due to Config)
1. ESLint warnings
2. TypeScript strict errors (ignored in builds)

## No Automated Testing
This project does not have:
- Unit tests
- E2E tests
- Test runners configured

All testing is manual via browser verification.
