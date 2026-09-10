# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git rules

**Never push.** Do not run `git push` — not to any branch, not even after committing, and not as part of a "finish the branch" flow. Push only when I explicitly ask for it in that message.

**Commit messages are a single line.** No body, no bullet points, no `Co-Authored-By` trailer, no footer of any kind. One line, properly capitalized, grammatically correct, written as a complete statement in the past tense.

Prefix every message with the category, followed by a spaced hyphen:

- `Feature - ` new functionality
- `Bug - ` fixes to broken behavior
- `UI - ` visual, layout, styling, or copy changes
- `Refactor - ` restructuring with no behavior change
- `Chore - ` dependencies, config, tooling, assets, housekeeping

Examples:

```
Feature - Added email and password logins functionality using BetterAuth built in system
Bug - Fixed the projects list dropping the final entry when no limit is applied
UI - Reworked the contact section spacing on mobile breakpoints
Refactor - Moved the page shell components out of the route files and into the layout
Chore - Upgraded SvelteKit to 2.49 and refreshed the lockfile
```

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:3000 (port pinned in vite.config.ts)
npm run build      # Production build via adapter-auto
npm run preview    # Serve the production build locally
npm run check      # svelte-kit sync + svelte-check (TypeScript/Svelte diagnostics)
npm run check:watch
```

There is no test suite, linter, or formatter configured. `npm run check` is the only verification gate — run it before claiming a change compiles. `.npmrc` sets `engine-strict=true`.

`.env` is gitignored and there is no `.env.example`. The only variable is `PUBLIC_WEB3FORMS_ACCESS_KEY`, consumed through `$env/static/public` in [src/lib/email.ts](src/lib/email.ts). Without it the build still works but the contact form returns a configuration error at submit time.

## Stack

SvelteKit 2 with **Svelte 5 runes** (`$state`, `$props`, `$derived`), TypeScript strict mode, Tailwind CSS **v4**, Vite 8, deployed to Vercel via `adapter-auto`.

Tailwind v4 is CSS-first: there is **no `tailwind.config.js`**. Design tokens live in the `@theme` block at the top of [src/routes/layout.css](src/routes/layout.css) (`--color-brand-primary: #ff6900`, `--color-background`, `--color-border-color`, …), which is what generates utilities like `bg-background`, `text-brand-primary`, `border-border-color`. Add or change a color there, not in a config file. Custom keyframes (`shimmer`, `scroll`, `scan`) and the Lenis/global overrides also live in that file.

Path aliases (declared in [svelte.config.js](svelte.config.js), on top of SvelteKit's built-in `$lib`/`$app`): `$components` → `src/components`, `$utils` → `src/utils`, `$assets` → `src/assets`.

## Architecture

**Fully static, two routes.** `/` ([src/routes/+page.svelte](src/routes/+page.svelte)) and `/projects` ([src/routes/projects/+page.svelte](src/routes/projects/+page.svelte)), plus [+error.svelte](src/routes/+error.svelte). There are no `+page.server.ts`/`+page.ts` load functions and no server endpoints — everything renders from static data and runs client-side. The only network call the app makes is the contact form POST to the Web3Forms API.

**Content is data, not markup.** All page content lives as typed arrays in `src/lib/`, each exporting an interface plus a default-exported array:

| Module | Drives |
| --- | --- |
| [projects.ts](src/lib/projects.ts) | project cards + detail popup (imports images from `$assets/project-images/`) |
| [experience.ts](src/lib/experience.ts) | experience timeline |
| [services.ts](src/lib/services.ts) | offerings section (icons are lucide components) |
| [technologies.ts](src/lib/technologies.ts) | skills marquee + `getIconClass()` name→devicon mapping |
| [navigation.ts](src/lib/navigation.ts) | navbar links |

Adding a project or a job means editing the data module, never the component. New tech-stack strings appearing in `projects.ts`/`experience.ts` render an icon only if `getIconClass()` in `technologies.ts` can resolve them — it normalizes the name (lowercase, strips spaces/dots/dashes), checks a hand-written override list, then substring-matches the `technologies` array. Unmatched names return `null` and render iconless. The devicon font itself is loaded from a jsDelivr CDN in [+layout.svelte](src/routes/+layout.svelte).

**The persistent shell lives in the layout; page furniture stays per route.** `+layout.svelte` owns global CSS, Vercel Analytics, site-wide `<head>` tags, and everything that must survive a navigation: `Navbar`, `ScrollToTop`, `CustomCursor`, `PageTransition`, and the single `initLenis()` call. These are mounted once — remounting them per route would reset the navbar's `scrolled` state, teleport the cursor, and stack Lenis instances. Each route still mounts its own `Toast`, `VerticalLines` ×2, `Footer` and `SEO`, which are page furniture and are covered by the transition overlay while it swaps.

**Toast is prop-drilled through a callback named `onMissing`.** Each route owns `toastMessage`/`showToast` `$state` and a local `triggerToast(msg)`, passed down as the `onMissing` prop to `projects.svelte` and `contact.svelte`. The name is historical — it is a general-purpose "show this message" callback, not a missing-link handler.

**Smooth scrolling is Lenis, and it fights native scrolling.** [src/lib/lenis.ts](src/lib/lenis.ts) dynamically imports Lenis and drives it with `requestAnimationFrame`; `layout.css` forces `html { scroll-behavior: initial !important }` so Lenis owns the viewport. The module is a **singleton** — `initLenis()` is called once by the root layout and guards against a second instance; `getLenis()`, `scrollToTop()` and `scrollToHash()` are how everything else moves the viewport. Never call `window.scrollTo` or `scrollIntoView` directly: Lenis will fight it for the same pixels. In-page anchor navigation is handled in `navbar.svelte`'s `handleNavigation` (`scrollToHash` when already on `/`, `goto` otherwise, letting the transition reset scroll).

**Route changes run through a particle transition.** [page-transition.svelte](src/components/repetitive/page-transition.svelte) hooks `onNavigate` and returns a promise, which holds SvelteKit's DOM swap until the overlay is covering. The "DNB" mark streams in from the leading edge of travel, holds for a beat while the route swaps and scroll resets behind it, then comes apart toward the opposite edge — with the backdrop clearing *during* the dispersal, so the new page is revealed through the dust. Total ~1.4s. Same-route navigations (`/#projects`) are skipped, and `prefers-reduced-motion` collapses it to a short fade.

The particle engine is shared with the intro loader: [src/lib/particle-mark.ts](src/lib/particle-mark.ts) samples the glyph bitmap and renders, but owns **no timeline** — callers hand `render()` a normalised 0..1 progress. That is what lets the loader run it over 1.8s while the transition runs it in a few hundred milliseconds and then backwards. Glyph sampling is the expensive half, so the transition calls `retarget()` to reassign trajectories per navigation and only rebuilds on resize.

**The cursor is custom and globally hidden.** `layout.css` sets `cursor: none` on all `button, a`. Every route must render `<CustomCursor />` ([custom-cursor.svelte](src/components/repetitive/custom-cursor.svelte), two `svelte/motion` springs following the pointer) or interactive elements have no visible cursor at all.

**`projects.svelte` is shared by both routes** and switches behavior on `fromHomePage` (heading copy, filters) and `limit`. Note that `/projects` passes `limit={-1}` and the component does `filteredProjects.slice(0, limit)` — a negative limit drops the last project rather than showing all of them.

`src/components/repetitive/` holds cross-page primitives (SEO, toast, loader, cursor, scroll helpers, decorative lines); `src/components/projects-page/` holds `/projects`-only sections; `src/components/icons/` holds hand-rolled SVG icons for platforms lucide doesn't cover.

## Conventions and gotchas

- Components use Svelte 5 runes throughout, **except** [SEO.svelte](src/components/repetitive/SEO.svelte), which still uses Svelte 4 `export let`. Match the surrounding file when editing.
- `SEO.svelte` also inlines Google Analytics and the JSON-LD `Person`/`WebSite` structured data with hardcoded `https://dagmawi.et` URLs. Route-level `<svelte:head>` blocks pass `title`/`description` overrides into it.
- [vercel.json](vercel.json) rewrites every path to `/`. Adding a real route means revisiting that rewrite and [static/sitemap.xml](static/sitemap.xml), which lists the routes explicitly.
- The homepage gates its own visibility behind a `Loader` component: content sits at `opacity-0` until the ~2.8s loader animation calls `onComplete`. The intro is **first-visit-only** — it records a `sessionStorage` flag and, on any later mount in the same tab, completes synchronously without painting, so returning to `/` costs nothing. Anything added to `/` inherits that delay on the first load only.
- Static assets in `static/` (resume PDFs, favicons, Thumbnail.png, webmanifest) are served from the site root; images imported through `$assets/` go through Vite hashing instead.
