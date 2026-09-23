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
  /**
   * Phase 3 detail-page data (match breakdown, trails, getting there, stay
   * options, cost breakdown, weather). Optional so any destination without
   * it yet still satisfies this type and Phase 2's grid/filter/sort code
   * — which never reads it — is unaffected.
   */
  detail?: AdventureDetailFields;
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

/* ---------------------------------------------------------------------- */
/* Phase 3 — /adventure/[id]                                              */
/* ---------------------------------------------------------------------- */

/** Sub-scores behind a destination's overall Adventure Match Score. */
export interface AdventureMatchBreakdown {
  accessibility: number; // 0–100
  budgetFit: number; // 0–100
  activityMatch: number; // 0–100
  difficultyMatch: number; // 0–100
  travelTime: number; // 0–100
}

export type TrailRouteType = "Loop" | "Out & Back" | "Point to Point";

export interface Trail {
  id: string;
  name: string;
  distanceMiles: number;
  durationMinutes: number;
  elevationGainFeet: number;
  difficulty: Difficulty;
  routeType: TrailRouteType;
  description: string;
}

export interface DrivingDetails {
  travelTimeMinutes: number;
  parkingInfo: string;
}

export interface PublicTransitDetails {
  /** Ordered legs of the trip, e.g. ["NYC", "Metro-North to Peekskill", "Shuttle to Bear Mountain"]. */
  steps: string[];
  travelTimeMinutes: number;
  lastMileInfo: string;
}

export interface TransportationDetails {
  driving: DrivingDetails;
  /** Omitted when the destination has no realistic car-free option. */
  publicTransit?: PublicTransitDetails;
}

export type StayType = "Campground" | "Cabin" | "Budget lodging";

export interface StayOption {
  id: string;
  name: string;
  type: StayType;
  nightlyCost: number;
  distanceFromTrailMiles: number;
  description: string;
}

export interface CostBreakdownItem {
  label: string;
  amount: number;
}

export interface WeatherDayPreview {
  day: string; // "Friday"
  tempF: number;
  condition: string; // "Partly cloudy"
}

/**
 * Phase 3 detail fields, added onto `DiscoverDestination` rather than a
 * separate record — the discover results page and the detail page read
 * the same destination objects, so there's one source of truth per id.
 * All optional so Phase 2's grid/filter/sort code (which never reads
 * these fields) keeps working unchanged.
 */
export interface AdventureDetailFields {
  matchBreakdown: AdventureMatchBreakdown;
  matchSummary: string;
  trails: Trail[];
  transportationDetails: TransportationDetails;
  stayOptions: StayOption[];
  costBreakdown: CostBreakdownItem[];
  weatherPreview: WeatherDayPreview[];
}

