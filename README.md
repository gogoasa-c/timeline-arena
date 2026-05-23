# Timeline Arena

An interactive web application documenting the history of Arena Nationala, Romania's national football stadium in Bucharest. The project was built as a coursework submission for the Software Project Design course.

## Purpose

Arena Nationala has existed in various forms since 1953. The current structure, rebuilt and reopened in 2011, holds UEFA Category 4 certification and has hosted European finals, major concerts, and international qualifiers. This application serves as an interactive archive of that history, combining a structured timeline with user-contributed memories.

## Functionality

**Timeline**
The home screen presents a scrubable timeline spanning 1953 to 2024. Selecting a year updates the displayed era name, description, and background photograph. Clicking through to a year's detail view shows a historical summary, key moments from that period, and any community memories associated with that year.

**Era Comparison**
A split-view screen allows two eras to be placed side by side with a draggable divider. Each panel shows a full-bleed photograph of the stadium in that period, overlaid with the year number and era description. Both years are independently selectable from a set of fixed reference points: 1968, 1990, 2011, and 2024.

**Interactive Map**
A schematic overhead map of the stadium marks six sections: North Curve, South Curve, Main Stand, East Stand, the Pitch, and the Main Gate. Selecting a section displays its description, a period photograph, and tabs for switching between historical periods. An era filter at the top of the screen synchronises the active period across all sections.

**Community Archive**
A grid of user-submitted and pre-loaded memories, grouped by year and filterable by type (Match, Event, Concert, and others). Each card opens a detail modal with the full memory text, author, like count, and share link. Memories can be liked within the modal; the updated count is reflected on the card in the grid.

**Add Memory**
A three-step upload flow (photo, form, confirmation) lets visitors contribute their own memories. Fields include year, title, name, memory text, and type. Submitted memories appear immediately in the archive for the current session without requiring a page reload.

**Deep Links and Sharing**
All major views encode their state into URL query parameters, making every screen bookmarkable and shareable. A share button copies the current URL to the clipboard. Supported deep-link states include home year, year detail, comparison panel selections, map hotspot and era, archive view, and individual post modals.

## Tech Stack

- React 19 with TypeScript
- Vite 8 for bundling and development server
- Inline styles throughout; no CSS-in-JS runtime used
- CSS custom properties for the design token system
- No client-side router; URL state managed via `URLSearchParams` and `history.replaceState`
- Deployed to GitHub Pages via GitHub Actions

## Live Site

The application is deployed at `https://gogoasa-c.github.io/timeline-arena/`.

## Local Development

```
npm install
npm run dev
```

The development server starts at `http://localhost:5173`. The production build is generated with `npm run build` and output to `dist/`.

## Adding Photos

Place image files in `public/photos/` and register them in `src/photos.config.ts`. The config maps submission IDs, era years, and hotspot section periods to file paths. Files placed in `public/` are served statically and copied verbatim into the build output.
