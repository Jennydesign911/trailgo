# TrailGo

Outdoor trip discovery and planning app.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Phase 1 — Landing Page (unchanged in this update)

- Hero, adventure search card (location, dates, transportation, activity,
  difficulty, $50–$500 budget), and a "Weekend escapes near you" preview
  section. Submitting the search card routes to `/discover` with the
  selections in the URL query string.

## Phase 2 — Discover / Search Results Page (this update)

- **`/discover`** is now a full results page instead of a placeholder:
  - **Search summary header** — reads `location`, `startDate`, `endDate`,
    `transportation`, `activity`, `difficulty`, `maxBudget` from the URL
    and displays them, with a "Modify search" link back to `/`.
  - **8 mock destinations** reachable from the NYC region, in
    `lib/discover-destinations.ts` (Bear Mountain, Harriman, Breakneck
    Ridge, Minnewaska, Mohonk Preserve, the Catskills, Delaware Water
    Gap, Fire Island).
  - **Adventure Match Score** shown as a prominent badge on every card
    (gold for 85%+, clay for 70–84%, outlined for below).
  - **Filters** (transportation, activity, difficulty, budget, car-free
    friendly only) that run against the mock data in the browser —
    pre-seeded from the search the user just ran on the landing page.
  - **Sorting**: Best Match, Lowest Cost, Shortest Travel Time.
  - **Map placeholder** ("Interactive map coming soon"), sticky on
    desktop, stacked below the results on mobile.
  - **Empty state** with a "Reset filters" action when a filter
    combination matches nothing.
  - Fully responsive: filters/results/map restack for tablet and mobile.
- **`/adventure/[id]`** — a minimal placeholder route so "View Adventure"
  has somewhere valid to go. Shows the destination name and a few raw
  fields if the id matches a mock destination; not the real detail page.

## Known limitations

- Geolocation ("current location") on the landing page is still a
  visual affordance only.
- `/adventure/[id]` is a stub, not the real adventure detail experience
  (itinerary, weather, lodging) — that's a later phase.
- No backend, database, or external APIs — everything is mocked in
  `lib/mock-destinations.ts` (Phase 1) and `lib/discover-destinations.ts`
  (Phase 2).
- No authentication.
- This sandbox has no network access, so the code was hand-written and
  checked with static analysis (import/export resolution, brace/paren
  balance) rather than an actual `npm install && npm run build`. Please
  run that locally as the real check — see the testing steps in the
  chat response that shipped this file.
