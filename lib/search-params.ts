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

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Reads the /discover URL search params back into a typed TripSearchParams,
 * filling in sensible defaults for anything missing or malformed so a
 * direct visit to /discover (no query string) or a stale/edited URL never
 * crashes the page.
 */
export function parseTripSearchParams(
  searchParams: RawSearchParams
): TripSearchParams {
  const transportation = firstValue(searchParams.transportation);
  const activity = firstValue(searchParams.activity);
  const difficulty = firstValue(searchParams.difficulty);
  const maxBudgetRaw = Number(firstValue(searchParams.maxBudget));

  return {
    location: firstValue(searchParams.location)?.trim() || "New York, NY",
    startDate: firstValue(searchParams.startDate) || "",
    endDate: firstValue(searchParams.endDate) || "",
    transportation: transportation === "no-car" ? "no-car" : "car",
    activity:
      activity === "camping" || activity === "both" ? activity : "hiking",
    difficulty:
      difficulty === "easy" || difficulty === "hard" ? difficulty : "moderate",
    maxBudget:
      Number.isFinite(maxBudgetRaw) && maxBudgetRaw > 0 ? maxBudgetRaw : 150,
  };
}

