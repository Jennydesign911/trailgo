export type TransportationMode = "car" | "no-car";

export type ActivityType = "hiking" | "camping" | "both";

export type Difficulty = "easy" | "moderate" | "hard";

/** A latitude/longitude pair. Use `VerifiedLocation` for anything shown on a map. */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** A named point used by the map (e.g. a trailhead or campground). */
export interface LabeledCoordinates extends Coordinates {
  label: string;
}

/**
 * Whether a piece of content has been checked against a real source.
 * Anything without an explicit "verified" is treated as "sample": hand-written
 * placeholder data that may be wrong and must never be shown as a confirmed
 * real-world recommendation.
 */
export type DataStatus = "sample" | "verified";

/**
 * Whether a real-world place can be used right now. A verified coordinate only
 * proves WHERE a place is, never that it is open — so this defaults to
 * "unknown" and is only set to something else when a source says so.
 */
export type AvailabilityStatus =
  | "open"
  | "temporarily_unavailable"
  | "closed"
  | "unknown";

/** A citable page and the date it was last read. */
export interface SourceRef {
  name: string;
  url: string;
  /** ISO date (YYYY-MM-DD) when this page was last read. */
  lastChecked: string;
}

/**
 * A map location that has been checked against a named, citable source
 * (for example NY State Parks, NY DEC or the National Park Service).
 *
 * The source fields are REQUIRED on purpose: if you can't name where a
 * coordinate came from, don't add it. Leave the field out instead, and the
 * map will hide that marker and show "location not verified".
 */
export interface VerifiedLocation extends LabeledCoordinates {
  /** Who published the coordinate, e.g. "NY State Parks". */
  source: string;
  /** Page the coordinate was read from. */
  sourceUrl: string;
  /** ISO date (YYYY-MM-DD) when `sourceUrl` was last read. */
  lastChecked: string;
  /** Current availability. Omitted = "unknown" (a coordinate alone never implies "open"). */
  availability?: AvailabilityStatus;
  /** What the source says about availability, e.g. a closure notice and its dates. */
  availabilityNote?: string;
  /** Optional caveat shown under the map. Closure text is repeated here until the UI reads `availability`. */
  note?: string;
}

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
  /** Shown on the card when something important is known, e.g. a closure. */
  notice?: string;
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
   * Where this destination's map marker goes, with the source it came from.
   * Omitted when no reliable source has been found — such destinations are
   * simply not drawn on the map (and the page says so).
   */
  coordinates?: VerifiedLocation;
  /**
   * Status of the non-location fields (cost, travel time, rating, match score).
   * Omitted = "sample".
   */
  dataStatus?: DataStatus;
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
  /** Omitted = "sample" (distance, duration and elevation are not verified). */
  dataStatus?: DataStatus;
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
  /** Sample value unless `dataStatus` says otherwise. */
  nightlyCost: number;
  /** Omitted when the distance is unknown or was found to be wrong. */
  distanceFromTrailMiles?: number;
  description: string;
  /**
   * The verified map location for this stay, when one exists. Points at the
   * SAME object used for the map marker, so the stay card and the map can
   * never disagree (for example about a closure).
   */
  location?: VerifiedLocation;
  /** Where we confirmed this place exists, when a source has been found. */
  existenceSource?: SourceRef;
  /** Applies to price, distance and description. Omitted = "sample". */
  dataStatus?: DataStatus;
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
  /**
   * Map points for the adventure detail page. Each one is optional and must
   * carry a source (see `VerifiedLocation`). A missing trailhead or
   * campground means "not verified yet", not "doesn't exist" — the detail
   * page tells those two cases apart using `stayOptions`.
   */
  mapMarkers: {
    trailhead?: VerifiedLocation;
    campground?: VerifiedLocation;
  };
}

/* ---------------------------------------------------------------------- */
/* Phase 4 — /trip/[id]                                                   */
/* ---------------------------------------------------------------------- */

/** One stop on the vertical door-to-trail timeline. */
export interface TripTimelineStep {
  id: string;
  time: string; // display string, e.g. "7:15 AM"
  title: string; // "Leave home", "Metro-North train"
  kind: "depart" | "transit" | "arrive" | "activity" | "return";
  /** Origin/destination or route detail, e.g. "Grand Central → Peekskill". */
  detail?: string;
  /** Place name, e.g. "New York, NY". */
  location?: string;
  durationMinutes?: number;
  note?: string;
}

export type TransportationLegMode = "transit" | "driving" | "shuttle" | "walk" | "ferry";

/** One leg of the journey, used by the "Transportation Details" section. */
export interface TransportationLeg {
  id: string;
  mode: TransportationLegMode;
  label: string; // "Metro-North Hudson Line"
  from: string;
  to: string;
  departure?: string;
  arrival?: string;
  durationMinutes: number;
  /** Approximate one-way fare in USD; omitted for a driving leg. */
  fare?: number;
  transferInfo?: string;
  // Driving-specific fields:
  distanceMiles?: number;
  parkingInfo?: string;
  estimatedDriveCost?: number;
}

export interface TripCostItem {
  label: string;
  amount: number;
}

/** The outdoor portion of the day, built from the destination's trail data. */
export interface TrailDayPlan {
  trailName: string;
  trailDistanceMiles: number;
  estimatedDurationMinutes: number;
  difficulty: Difficulty;
  elevationGainFeet?: number;
  suggestedStartTime: string;
  suggestedFinishTime: string;
  lunchWindow: string;
  checklist: string[];
}

export interface TripWeatherWindow {
  label: string; // "Morning" / "Afternoon"
  tempF: number;
  condition: string;
}

/**
 * A full door-to-trail plan for one adventure. Connected to a destination
 * via `adventureId`, which matches a `DiscoverDestination.id`. Kept as its
 * own record (rather than folded into `detail`) since a single adventure
 * could eventually support multiple trip-plan variants (different dates,
 * start points, or transportation choices).
 */
export interface TripPlan {
  adventureId: string;
  tripDate: string; // display string, e.g. "Saturday, Oct 18"
  transportationModeLabel: string; // "Train + Shuttle", "Driving"
  summary: string;
  departure: string;
  arrivalAtTrail: string;
  trailStartTime: string;
  returnTime: string;
  estimatedArrivalHome: string;
  totalTravelTimeMinutes: number;
  timeline: TripTimelineStep[];
  transportationLegs: TransportationLeg[];
  trailDayPlan: TrailDayPlan;
  costBreakdown: TripCostItem[];
  weatherWindows: TripWeatherWindow[];
  weatherRecommendation: string;
  /** Shown prominently when the plan cannot currently be followed, e.g. a closure. */
  notice?: string;
}

