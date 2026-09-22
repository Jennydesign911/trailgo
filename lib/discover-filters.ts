import {
  DiscoverDestination,
  DiscoverFilters,
  SortOption,
  TripSearchParams,
} from "./types";

/** Default filter state, seeded from the search the user ran on the landing page. */
export function filtersFromTripSearch(
  search: TripSearchParams
): DiscoverFilters {
  return {
    transportation: search.transportation,
    activity: search.activity,
    difficulty: search.difficulty,
    maxBudget: search.maxBudget,
    // If they said "no car", default to showing only car-free-friendly
    // spots — it's the constraint that actually matters to them. They can
    // still turn it off in the filter bar.
    carFreeFriendlyOnly: search.transportation === "no-car",
  };
}

export const DEFAULT_FILTERS: DiscoverFilters = {
  transportation: "any",
  activity: "any",
  difficulty: "any",
  maxBudget: 500,
  carFreeFriendlyOnly: false,
};

export function filterDestinations(
  destinations: DiscoverDestination[],
  filters: DiscoverFilters
): DiscoverDestination[] {
  return destinations.filter((destination) => {
    if (
      filters.transportation !== "any" &&
      !destination.transportationOptions.includes(filters.transportation)
    ) {
      return false;
    }

    if (filters.activity !== "any") {
      const hasHiking = destination.activities.includes("hiking");
      const hasCamping = destination.activities.includes("camping");
      if (filters.activity === "hiking" && !hasHiking) return false;
      if (filters.activity === "camping" && !hasCamping) return false;
      if (filters.activity === "both" && !(hasHiking && hasCamping)) {
        return false;
      }
    }

    if (
      filters.difficulty !== "any" &&
      destination.difficulty !== filters.difficulty
    ) {
      return false;
    }

    if (destination.estimatedTripCost > filters.maxBudget) return false;

    if (filters.carFreeFriendlyOnly && !destination.carFreeFriendly) {
      return false;
    }

    return true;
  });
}

export function sortDestinations(
  destinations: DiscoverDestination[],
  sort: SortOption
): DiscoverDestination[] {
  const sorted = [...destinations];

  switch (sort) {
    case "lowest-cost":
      return sorted.sort((a, b) => a.estimatedTripCost - b.estimatedTripCost);
    case "shortest-travel":
      return sorted.sort(
        (a, b) => a.estimatedTravelTimeMinutes - b.estimatedTravelTimeMinutes
      );
    case "best-match":
    default:
      return sorted.sort(
        (a, b) => b.adventureMatchScore - a.adventureMatchScore
      );
  }
}
