"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "./FilterBar";
import { SortControl } from "./SortControl";
import { DestinationResultCard } from "./DestinationResultCard";
import { MapPlaceholder } from "./MapPlaceholder";
import { EmptyState } from "./EmptyState";
import {
  DEFAULT_FILTERS,
  filterDestinations,
  sortDestinations,
} from "@/lib/discover-filters";
import { DiscoverDestination, DiscoverFilters, SortOption } from "@/lib/types";

interface DiscoverResultsProps {
  destinations: DiscoverDestination[];
  initialFilters: DiscoverFilters;
}

export function DiscoverResults({
  destinations,
  initialFilters,
}: DiscoverResultsProps) {
  const [filters, setFilters] = useState<DiscoverFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>("best-match");

  function updateFilter<K extends keyof DiscoverFilters>(
    key: K,
    value: DiscoverFilters[K]
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const results = useMemo(() => {
    const filtered = filterDestinations(destinations, filters);
    return sortDestinations(filtered, sort);
  }, [destinations, filters, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <FilterBar
            filters={filters}
            onChange={updateFilter}
            onReset={resetFilters}
          />
        </aside>

        <div>
          <SortControl
            value={sort}
            onChange={setSort}
            resultCount={results.length}
          />

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              {results.length === 0 ? (
                <EmptyState onReset={resetFilters} />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {results.map((destination) => (
                    <DestinationResultCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))}
                </div>
              )}
            </div>

            <MapPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
}
