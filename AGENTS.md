# AGENTS.md

Guidance for AI agents and automated tools working in this repository.

## Project Overview

Timeline Arena is a single-page React application. It has no backend. All data is static (defined in `src/data.ts` and
`src/photos.config.ts`) or ephemeral session state. There is no database, no API, and no authentication layer.

## Commands

```
npm run dev        # start Vite development server on localhost:5173
npm run build      # type-check then build to dist/
npm run lint       # run ESLint
npx tsc --noEmit   # type-check only, no output
```

Always run `npx tsc --noEmit` after making changes. The build is considered broken if it produces type errors.

## Architecture

**Navigation**
There is no React Router. Navigation state (`screen`, `year`) lives in `App.tsx` as `useState`. The active screen is
rendered by a `ScreenRenderer` switch component inside `App.tsx`. URL query parameters are kept in sync via
`src/hooks/useUrlSync.ts` (`readParams` / `writeParams` wrapping `URLSearchParams` and `history.replaceState`).

**Screens**
Each screen is a memoised component in `src/screens/`. Screens that own their own URL state (ComparisonScreen,
HotspotsScreen) read initial values from `readParams()` on mount and write updates in `useEffect`. App.tsx handles the
URL for all other screens.

**Styling**
All styles are inline React style objects. There is no CSS module system, no Tailwind, and no active CSS-in-JS runtime (
Emotion is installed as a dependency but is not used). Shared design tokens are CSS custom properties declared in
`src/styles/globals.css`. Do not introduce a new styling system.

**Photos**
Static photo assets live in `public/photos/`. They are registered in `src/photos.config.ts` which maps submission IDs,
era years, and hotspot section/period pairs to relative file paths (no leading slash). `src/data.ts` imports this config
and prepends `import.meta.env.BASE_URL` via `withBase()` so paths resolve correctly in both development and on GitHub
Pages (`/timeline-arena/`). Never use absolute paths starting with `/` for assets.

**Modals**
`UploadFlow` and `PostDetailModal` are rendered via `createPortal` into `document.body`.

## Key Files

| Path                             | Purpose                                                                   |
|----------------------------------|---------------------------------------------------------------------------|
| `src/App.tsx`                    | Root component, navigation state, URL initialisation                      |
| `src/data.ts`                    | Static data, photo helpers (`getEraPhoto`, `getHotspotPhoto`), `withBase` |
| `src/photos.config.ts`           | Photo path mappings for submissions, eras, and hotspot periods            |
| `src/types/index.ts`             | Shared TypeScript types (`Screen`, `Submission`, `Era`, `HotspotSection`) |
| `src/hooks/useUrlSync.ts`        | `readParams()` and `writeParams()` URL helpers                            |
| `src/components/ShareButton.tsx` | Reusable share button with clipboard copy and copied feedback             |
| `src/styles/globals.css`         | CSS custom properties (design tokens), fonts, animations                  |
| `public/photos/`                 | Static image assets copied verbatim into the build                        |
| `vite.config.ts`                 | Vite config; sets `base: '/timeline-arena/'` for GitHub Pages             |
| `.github/workflows/deploy.yml`   | CI/CD: build and deploy to GitHub Pages on push to master/main            |

## Data Conventions

**Adding a new static submission:** Add an entry to `RAW_SUBMISSIONS` in `src/data.ts` and optionally a photo mapping in
`src/photos.config.ts`.

**Adding era photos:** Add the file to `public/photos/`, then add an entry under `eras` in `src/photos.config.ts` keyed
by the exact year number.

**Adding hotspot period photos:** Add the file to `public/photos/map/`, then add an entry under the relevant hotspot ID
and period label in `src/photos.config.ts`. Period labels must exactly match those used in
`HOTSPOTS[n].periods[n].label` in `src/data.ts`.

**Adding a new screen:** Add the screen name to the `Screen` union type in `src/types/index.ts`, add a case to the
`ScreenRenderer` switch in `App.tsx`, and add URL sync logic following the pattern in `ComparisonScreen.tsx` or
`HotspotsScreen.tsx` as appropriate.

## URL Parameter Reference

| Screen                 | Parameters                                                           |
|------------------------|----------------------------------------------------------------------|
| Home                   | `?year=<number>`                                                     |
| Year detail            | `?screen=yearDetail&year=<number>`                                   |
| Comparison             | `?screen=comparison&left=<year>&right=<year>`                        |
| Hotspots               | `?screen=hotspots&hotspot=<hotspot-id>&era=<1968\|1990\|2011\|2024>` |
| Archive                | `?screen=archive`                                                    |
| Archive with open post | `?screen=archive&post=<submission-id>`                               |

## Constraints

- Do not add a client-side router dependency. URL sync is intentionally manual.
- Do not use absolute asset paths. Always go through `withBase()` or `import.meta.env.BASE_URL`.
- Do not write CSS files for component styles. Use inline style objects.
- The `@emotion/react` and `@emotion/styled` packages are present in `package.json` but must not be used.
- Keep the `base` value in `vite.config.ts` set to `'/timeline-arena/'`. Changing it will break the GitHub Pages
  deployment.
- There is no test suite. Type-check with `npx tsc --noEmit` as the minimum correctness gate.
