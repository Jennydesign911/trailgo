import { TripSearchParams } from "./types";

/**
 * Serializes the trip search form into URL search params so /discover
 * can read the user's selections directly from the query string.
 */
export function tripSearchParamsToQueryString(
  params: TripSearchParams
): string {
  const query = new URLSearchParams({
    location: params.location,
    startDate: params.startDate,
    endDate: params.endDate,
    transportation: params.transportation,
    activity: params.activity,
    difficulty: params.difficulty,
    maxBudget: String(params.maxBudget),
  });

  return query.toString();
}
