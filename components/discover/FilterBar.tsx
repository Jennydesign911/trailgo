"use client";

import { ToggleGroup } from "@/components/search/ToggleGroup";
import { BudgetSlider } from "@/components/search/BudgetSlider";
import {
  ActivityType,
  Difficulty,
  DiscoverFilters,
  TransportationMode,
} from "@/lib/types";

interface FilterBarProps {
  filters: DiscoverFilters;
  onChange: <K extends keyof DiscoverFilters>(
    key: K,
    value: DiscoverFilters[K]
  ) => void;
  onReset: () => void;
}

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  return (
    <div className="rounded-card border border-mist bg-white/70 p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-moss hover:text-clay"
        >
          Reset filters
        </button>
      </div>

      <div className="mt-4 grid gap-5">
        <ToggleGroup<TransportationMode | "any">
          legend="Transportation"
          value={filters.transportation}
          onChange={(value) => onChange("transportation", value)}
          options={[
            { value: "any", label: "Any" },
            { value: "car", label: "Car" },
            { value: "no-car", label: "No car" },
          ]}
        />

        <ToggleGroup<ActivityType | "any">
          legend="Activity"
          value={filters.activity}
          onChange={(value) => onChange("activity", value)}
          options={[
            { value: "any", label: "Any" },
            { value: "hiking", label: "Hiking" },
            { value: "camping", label: "Camping" },
            { value: "both", label: "Hiking + Camping" },
          ]}
        />

        <ToggleGroup<Difficulty | "any">
          legend="Difficulty"
          value={filters.difficulty}
          onChange={(value) => onChange("difficulty", value)}
          options={[
            { value: "any", label: "Any" },
            { value: "easy", label: "Easy" },
            { value: "moderate", label: "Moderate" },
            { value: "hard", label: "Hard" },
          ]}
        />

        <BudgetSlider
          value={filters.maxBudget}
          onChange={(value) => onChange("maxBudget", value)}
        />

        <label className="flex items-center gap-2.5 text-sm text-ink/80">
          <input
            type="checkbox"
            checked={filters.carFreeFriendlyOnly}
            onChange={(event) =>
              onChange("carFreeFriendlyOnly", event.target.checked)
            }
            className="h-4 w-4 rounded border-mist text-clay focus:ring-clay"
          />
          Car-free friendly only
        </label>
      </div>
    </div>
  );
}
