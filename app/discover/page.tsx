import { DiscoverHeader } from "@/components/discover/DiscoverHeader";
import { DiscoverResults } from "@/components/discover/DiscoverResults";
import { discoverDestinations } from "@/lib/discover-destinations";
import { filtersFromTripSearch } from "@/lib/discover-filters";
import { parseTripSearchParams } from "@/lib/search-params";

/**
 * Server component: reads the URL search params written by the landing
 * page's search card (Phase 1) so a fresh load or a refresh always shows
 * the right search summary, even with a partial or stale query string.
 * All interactive filtering/sorting lives in the client component below.
 */
export default function DiscoverPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const search = parseTripSearchParams(searchParams);
  const initialFilters = filtersFromTripSearch(search);

  return (
    <main className="min-h-screen bg-paper">
      <DiscoverHeader search={search} />
      <DiscoverResults
        destinations={discoverDestinations}
        initialFilters={initialFilters}
      />
    </main>
  );
}
