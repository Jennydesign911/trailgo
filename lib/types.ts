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
