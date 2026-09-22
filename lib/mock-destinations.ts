import { Destination } from "./types";

/**
 * Placeholder destination data for "Weekend escapes near you".
 * Replace with a real recommendation source in a later phase.
 */
export const weekendEscapes: Destination[] = [
  {
    id: "harriman-state-park",
    name: "Harriman State Park",
    location: "Southfields, NY",
    difficulty: "moderate",
    hikingDistanceMiles: 6.2,
    travelTimeMinutes: 75,
    reachableBy: ["car", "no-car"],
    estimatedCost: 65,
    imageGradient: "trail-1",
  },
  {
    id: "breakneck-ridge",
    name: "Breakneck Ridge",
    location: "Cold Spring, NY",
    difficulty: "hard",
    hikingDistanceMiles: 3.7,
    travelTimeMinutes: 90,
    reachableBy: ["car", "no-car"],
    estimatedCost: 45,
    imageGradient: "trail-3",
  },
  {
    id: "minnewaska-state-park",
    name: "Minnewaska State Park Preserve",
    location: "Kerhonkson, NY",
    difficulty: "easy",
    hikingDistanceMiles: 4.5,
    travelTimeMinutes: 110,
    reachableBy: ["car"],
    estimatedCost: 80,
    imageGradient: "trail-2",
  },
];
