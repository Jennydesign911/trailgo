export type TransportationMode = "car" | "no-car";

export type ActivityType = "hiking" | "camping" | "both";

export type Difficulty = "easy" | "moderate" | "hard";

/**
 * Shape of the trip search form. This is the single source of truth for
 * what the landing page collects and what it hands off to /discover.
 */
export interface TripSearchParams {
  location: string;
  startDate: string; // ISO date string, e.g. "2026-10-03"
  endDate: string;
  transportation: TransportationMode;
  activity: ActivityType;
  difficulty: Difficulty;
  maxBudget: number; // USD
}

/**
 * A single recommended destination. Fields map to the data this card
 * will eventually pull from real trail, lodging, weather and pricing
 * sources — for now it's populated from mock-destinations.ts.
 */
export interface Destination {
  id: string;
  name: string;
  location: string;
  difficulty: Difficulty;
  hikingDistanceMiles: number;
  travelTimeMinutes: number;
  reachableBy: TransportationMode[];
  estimatedCost: number;
  imageGradient: "trail-1" | "trail-2" | "trail-3";
}

/* ---------------------------------------------------------------------- */
/* Phase 2 — /discover                                                    */
/* ---------------------------------------------------------------------- */

/** What a destination actually offers, independent of what the user asked for. */
export type ActivityTag = "hiking" | "camping";

/**
 * A richer destination record for the discover/results page. Kept separate
 * from `Destination` (Phase 1's "Weekend escapes" card) so Phase 1 stays
 * untouched — this is a superset built for filtering, sorting and detail.
 */
export interface DiscoverDestination {
  id: string;
  name: string;
  region: string;
  shortDescription: string;
  activities: ActivityTag[];
  difficulty: Difficulty;
  estimatedTravelTimeMinutes: number;
  transportationOptions: TransportationMode[];
  carFreeFriendly: boolean;
  estimatedTripCost: number;
  trailDistanceMiles: number;
  rating: number; // 0–5
  adventureMatchScore: number; // 0–100
  imageGradient: "trail-1" | "trail-2" | "trail-3";
}

/** Sort options for the discover results list. */
export type SortOption = "best-match" | "lowest-cost" | "shortest-travel";

/**
 * Filter state for the discover page. Each field can be "any" (or, for
 * carFreeFriendlyOnly, false) to mean "no constraint on this field".
 */
export interface DiscoverFilters {
  transportation: TransportationMode | "any";
  activity: ActivityType | "any";
  difficulty: Difficulty | "any";
  maxBudget: number;
  carFreeFriendlyOnly: boolean;
}

