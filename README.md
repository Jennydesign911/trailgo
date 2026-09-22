# TrailGo

Outdoor trip discovery and planning app. Phase 1: landing page only.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's implemented (Phase 1 — Landing Page)

- Hero section with headline, supporting copy, and a topographic
  background motif.
- Adventure search card: starting location (with a visual, non-functional
  current-location button), start/end dates, transportation
  (car / no car), activity (hiking / camping / hiking + camping),
  difficulty (easy / moderate / hard), and a $50–$500 budget slider.
- Submitting the form validates that a location and both dates are set,
  then navigates to `/discover` with all selections preserved as URL
  query parameters.
- "Weekend escapes near you" section with 3 mock destination cards
  (Harriman State Park, Breakneck Ridge, Minnewaska State Park
  Preserve), each showing difficulty, hiking distance, travel time,
  a transportation icon, and estimated cost.
- Fully responsive: the search form and destination grid stack on
  mobile.

## Known limitations / not implemented

- Geolocation for "current location" is a visual affordance only —
  clicking it does nothing yet.
- `/discover` is a placeholder route that only echoes the received
  query parameters, to prove the handoff works. The actual results
  experience (trail data, lodging, weather, cost estimation, Adventure
  Match Score, itinerary) is a later phase.
- No backend, database, or external APIs — all data is mocked in
  `lib/mock-destinations.ts`.
- No authentication.
