"use client";

import { SortOption } from "@/lib/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "best-match", label: "Best Match" },
  { value: "lowest-cost", label: "Lowest Cost" },
  { value: "shortest-travel", label: "Shortest Travel Time" },
];

interface SortControlProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultCount: number;
}

export function SortControl({ value, onChange, resultCount }: SortControlProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-ink/60">
        {resultCount} {resultCount === 1 ? "adventure" : "adventures"} found
      </p>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={[
                "rounded-pill border px-4 py-2 text-sm transition-colors",
                selected
                  ? "border-clay bg-clay/10 text-clay-dark"
                  : "border-mist bg-white/60 text-ink/70 hover:border-moss",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
