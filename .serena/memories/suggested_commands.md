# Suggested Commands

## Development Commands

### Installation
```bash
# Install all dependencies
pnpm install
```

### Development Server
```bash
# Start development server (runs on http://localhost:3000)
pnpm dev
```

### Build and Production
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality
```bash
# Run ESLint
pnpm lint
```

Note: ESLint and TypeScript errors are configured to be ignored during builds (`next.config.mjs`), but linting can still be run manually.

## Adding UI Components

### shadcn/ui Components
```bash
# Add a specific shadcn component (e.g., button, card, dialog)
npx shadcn@latest add [component-name]

# Examples:
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add card
```

**Important**: Never manually edit components in `components/ui/`. Always regenerate using the above command.

## Git Commands
```bash
# Check repository status
git status

# View diff
git diff

# Commit changes
git add .
git commit -m "commit message"

# Push to remote
git push

# View commit history
git log --oneline
```

## Useful File Operations
```bash
# List files in current directory
ls -la

# Navigate directories
cd [directory]

# Find files by name
find . -name "*.tsx"

# Search file contents (grep)
grep -r "search term" .

# View file contents
cat [filename]
```

## Package Management
```bash
# Add a dependency
pnpm add [package-name]

# Add a dev dependency
pnpm add -D [package-name]

# Remove a dependency
pnpm remove [package-name]

# Update dependencies
pnpm update

# View outdated packages
pnpm outdated
```

## Next.js Specific
```bash
# Clear Next.js cache
rm -rf .next

# Clean install
rm -rf node_modules .next
pnpm install
```

## System Information
- **Operating System**: Linux (5.15.0-1072-realtime)
- **Platform**: linux
- **Package Manager**: pnpm