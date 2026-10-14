"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "./FilterBar";
import { SortControl } from "./SortControl";
import { DestinationResultCard } from "./DestinationResultCard";
import { EmptyState } from "./EmptyState";
import { AdventureMap, AdventureMapPoint } from "@/components/map/AdventureMap";
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

const difficultyLabel: Record<DiscoverDestination["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

function buildPopupHtml(destination: DiscoverDestination): string {
  const markerLabel = destination.coordinates?.label;
  const markerLine =
    markerLabel && markerLabel !== destination.name
      ? `<p style="margin:0 0 8px; font-size: 11px; color: rgba(22,36,28,0.5);">Map point: ${markerLabel}</p>`
      : "";
  return `
    <div style="font-family: var(--font-public-sans), system-ui, sans-serif; padding: 4px 2px; min-width: 180px;">
      <p style="margin:0 0 4px; font-family: var(--font-fraunces), serif; font-size: 15px; color:#16241C;">${destination.name}</p>
      <p style="margin:0 0 8px; font-size: 12px; color: rgba(22,36,28,0.6);">
        ${difficultyLabel[destination.difficulty]} · ${destination.trailDistanceMiles} mi · $${destination.estimatedTripCost}
      </p>
      ${markerLine}
      <p style="margin:0 0 10px; font-size: 12px; color:#BC5B2E; font-weight: 600;">
        ${destination.adventureMatchScore}% Adventure Match
      </p>
      <a href="/adventure/${destination.id}" style="display:inline-block; background:#1F3626; color:#F3F1E8; font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 999px; text-decoration: none;">
        View Adventure
      </a>
    </div>
  `;
}

export function DiscoverResults({
  destinations,
  initialFilters,
}: DiscoverResultsProps) {
  const [filters, setFilters] = useState<DiscoverFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>("best-match");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const highlightedId = hoveredId ?? selectedId;

  // Only destinations with a verified, sourced location are drawn on the map.
  const mapPoints: AdventureMapPoint[] = useMemo(() => {
    const points: AdventureMapPoint[] = [];
    for (const destination of results) {
      if (destination.coordinates) {
        points.push({
          id: destination.id,
          kind: "destination",
          label: destination.coordinates.label,
          coordinates: destination.coordinates,
        });
      }
    }
    return points;
  }, [results]);

  const unmappedCount = results.length - mapPoints.length;

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
                      highlighted={destination.id === highlightedId}
                      onHoverStart={() => setHoveredId(destination.id)}
                      onHoverEnd={() => setHoveredId(null)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
              <AdventureMap
                points={mapPoints}
                highlightedId={highlightedId}
                onMarkerClick={(id) => setSelectedId(id)}
                onMarkerHoverStart={(id) => setHoveredId(id)}
                onMarkerHoverEnd={() => setHoveredId(null)}
                getPopupHtml={(id) => {
                  const destination = results.find((d) => d.id === id);
                  return destination ? buildPopupHtml(destination) : null;
                }}
                heightClassName="h-80 lg:h-[calc(100vh-7rem)]"
              />
              {unmappedCount > 0 && (
                <p className="mt-2 text-xs text-ink/60">
                  {unmappedCount} of {results.length}{" "}
                  {results.length === 1 ? "adventure isn't" : "adventures aren't"}{" "}
                  shown on the map: location not verified yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
