# CLAUDE.md

Orientation for coding agents working in this repo. Read this first; deeper
feature docs live in `README.md` and `E2E_TEST_PLAN.md`.

This is a single-artist portfolio site ("Aviary's Art Gallery"): a Next.js 16
App Router app (Turbopack) whose signature feature is a **horizontal
scroll-jacking timeline** of paintings. The UI is in Japanese.

---

## WHY — premises that must not be casually overturned

- **v0.app sync is over.** This repo started as a v0.app project but is no
  longer edited there (as of 2026-07); this repository is the single source of
  truth. Leftover v0 conventions (see build checks below) still apply until
  deliberately changed.
- **No backend, no database, no auth.** All content is static data compiled
  into the bundle (`lib/data/artworks.ts`) plus images in `public/`. Don't
  introduce a data layer to "fix" this — it's intentional.
- **TS build checks are deliberately disabled** (`next.config.mjs`):
  `ignoreBuildErrors` is on and images are `unoptimized` (v0 rapid-prototyping
  defaults). A green `pnpm build` therefore proves *nothing* about type
  correctness — see HOW. ESLint is fully decoupled from the build: Next 16
  removed `next lint`, so `pnpm lint` runs `eslint .` with the flat config in
  `eslint.config.mjs`.
- **ESLint 10 and TypeScript 7 are deliberately held back.** Both break the
  lint toolchain: eslint-plugin-react (pinned by eslint-config-next) still
  uses APIs removed in ESLint 10, and typescript-eslint only supports
  `typescript <6.1.0`. Don't bump them until those upstreams catch up.
- **Japanese UI text is intentional** (こんにちは, タイムライン, 私について…).
  Preserve the language when editing copy.

---

## WHAT — repository structure

```
app/
  layout.tsx              # Root layout; sets metadataBase (OGP base URL)
  page.tsx                # Home; exports OGP metadata using the latest artwork
  artwork/[id]/page.tsx   # Per-artwork detail + generateMetadata (async params)
  artwork/[id]/artwork-detail-client.tsx  # Client UI incl. image lightbox
  about_me/page.tsx       # Static "私について" page
  manifest.ts             # PWA manifest
  globals.css             # Theme CSS variables (:root / .dark)
components/
  horizontal-scroll-gallery.tsx  # THE core feature (scroll-jacking) — fragile
  header.tsx              # Nav; year-jump menu is HARDCODED (see pitfalls)
  artwork-card.tsx        # Card; adapts to portrait/landscape orientation
  hero.tsx footer.tsx theme-provider.tsx
  ui/                     # shadcn/ui (new-york) — generated, do not hand-edit
                          #   (only button + card; unused ones were removed)
lib/
  data/artworks.ts        # Single source of all artwork content + Artwork type
  utils.ts                # cn() helper
tests/e2e/                # Playwright specs (home, navigation, detail, about)
public/                   # Images, named by date e.g. /2024-03_F6.jpg
```

**Core domain type:** `Artwork` in `lib/data/artworks.ts`. The `artworks` array
is the only content store; everything (gallery, detail pages, OGP) reads from it.

Imports use the `@/` path alias (configured in `tsconfig.json`).

---

## HOW — run and verify

### Local run (pnpm only)

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Verification

| Command | What it checks | Notes |
|---|---|---|
| `pnpm exec tsc --noEmit` | Real type errors | **Use this** — `pnpm build` swallows them |
| `pnpm test:e2e` | Behavior (Playwright) | Auto-starts `pnpm dev`; required before commit |
| `pnpm lint` | ESLint (`eslint .`, flat config in `eslint.config.mjs`) | Advisory; not part of the build |
| `pnpm build` | Production build | Green ≠ correct (errors ignored) |

E2E projects: `test:e2e:chromium`, `:firefox`, `:mobile`. Use `:ui` /
`:headed` / `:debug` for local debugging, `:report` to view the last run.

### Manual verification

The scroll-jacking gallery (`horizontal-scroll-gallery.tsx`) cannot be fully
trusted to unit checks. After touching it, manually scroll the home page and
test the header year-jump menu in a browser.

---

## Pitfalls specific to this project

1. **The year-jump menu is hardcoded.** `header.tsx` has one `<button>` per
   year (2022–2026). Adding an artwork from a *new* year does **not** create a
   nav entry — you must add the button manually. Keep buttons newest-first.

2. **`artworks` is stored oldest-first; the gallery reverses it.** The array in
   `lib/data/artworks.ts` is chronological (2022 → 2026). The gallery renders
   `[...artworks].reverse()` to show newest-first. Append new artworks at the
   end in date order; don't re-sort the source array.

3. **`year` must be lexically sortable `YYYY-MM`.** Home-page OGP picks the
   "latest" artwork via `b.year.localeCompare(a.year)`, and year-jump matches
   with `year.startsWith("2026")`. Always zero-pad the month (`"2024-03"`).

4. **`id` is the URL.** `/artwork/[id]` does `Number.parseInt(id)` and
   `notFound()` if unmatched. Each `id` must be a unique number; don't reuse or
   renumber existing ones (breaks shared links and OGP).

5. **The scroll-jacking math is fragile.** It maps vertical scroll → `translateX`
   using `getBoundingClientRect()` *after* transforms, a `position: sticky`
   container, and a retry loop (up to 5×) for refs not ready on mount. Small
   changes to layout/padding (`paddingLeft/Right: 100vw`, gaps, card sizes) can
   silently break centering and year-jump. Verify manually + via E2E.

6. **shadcn/ui components are generated.** Don't hand-edit `components/ui/*`;
   re-add with `npx shadcn@latest add`.

7. **`Artwork.orientation` is set by hand.** `"portrait"` (3:4) vs
   `"landscape"` (4:3) drives card and detail-page sizing. There's no
   auto-detection from the image — pick the right one when adding artwork.

8. **OGP base URL comes from env.** `layout.tsx` resolves `VERCEL_URL` →
   `NEXT_PUBLIC_BASE_URL` → `http://localhost:3000`. Set
   `NEXT_PUBLIC_BASE_URL` for custom-domain deploys or social previews break.

9. **Same-URL `<Link>` clicks don't scroll in Next 16.** Clicking the header
   logo while on the home page must return to the top; Next 16 keeps the
   scroll position on same-URL navigations, so `header.tsx` handles this with
   an explicit `onClick` → `window.scrollTo(0, 0)`. Don't remove it.

10. **The gallery intentionally violates react-hooks v6 rules.**
    `react-hooks/refs` and `react-hooks/immutability` are downgraded to
    warnings for `horizontal-scroll-gallery.tsx` only (see
    `eslint.config.mjs`): the scroll-jacking math reads/writes refs during
    render on purpose. Don't "fix" the warnings casually — see pitfall 5.

11. **`turbopack.root` is pinned in `next.config.mjs`.** Parent directories
    contain stray lockfiles that make Turbopack misinfer the workspace root
    (breaking asset serving in dev). Keep the setting.

---

## Adding an artwork (the common task)

1. Add an object to the `artworks` array in `lib/data/artworks.ts`, in date
   order, with all fields of `Artwork` (`id`, `title`, `year` as `YYYY-MM`,
   `description`, `image`, `tags`, `fullDescription`, `medium`, `dimensions`,
   `orientation`). Content fields are Japanese.
2. Put the image in `public/` (filename convention: `/YYYY-MM_<size>.jpg`).
3. If it's a **new year**, add a year button to the menu in `header.tsx`
   (pitfall #1).
4. Verify: `pnpm exec tsc --noEmit` then `pnpm test:e2e`.

---

## Project-specific style

- Styling is Tailwind v4 utility classes + CSS variables in `globals.css`;
  use `cn()` from `lib/utils` for conditional classes. Theme via `next-themes`.
- Most interactive components are client components (`"use client"`); the
  artwork detail route splits a server `page.tsx` (metadata) from a client
  `artwork-detail-client.tsx` (lightbox, interactivity). Follow that split.

## Reference

- `README.md` — fuller feature/setup docs
- `E2E_TEST_PLAN.md` — test coverage plan
