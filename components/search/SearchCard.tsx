"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocationInput } from "./LocationInput";
import { DateRangeInput } from "./DateRangeInput";
import { ToggleGroup } from "./ToggleGroup";
import { BudgetSlider } from "./BudgetSlider";
import { tripSearchParamsToQueryString } from "@/lib/search-params";
import {
  ActivityType,
  Difficulty,
  TransportationMode,
  TripSearchParams,
} from "@/lib/types";

const DEFAULT_PARAMS: TripSearchParams = {
  location: "",
  startDate: "",
  endDate: "",
  transportation: "car",
  activity: "hiking",
  difficulty: "moderate",
  maxBudget: 150,
};

export function SearchCard() {
  const router = useRouter();
  const [params, setParams] = useState<TripSearchParams>(DEFAULT_PARAMS);
  const [error, setError] = useState<string | null>(null);

  function updateParams<K extends keyof TripSearchParams>(
    key: K,
    value: TripSearchParams[K]
  ) {
    setParams((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!params.location.trim()) {
      setError("Add a starting location so we know where to search from.");
      return;
    }
    if (!params.startDate || !params.endDate) {
      setError("Pick a start and end date for your trip.");
      return;
    }

    setError(null);
    const query = tripSearchParamsToQueryString(params);
    router.push(`/discover?${query}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-mist bg-paper/95 p-6 shadow-card backdrop-blur sm:p-8"
    >
      <div className="grid gap-5">
        <LocationInput
          value={params.location}
          onChange={(value) => updateParams("location", value)}
        />

        <DateRangeInput
          startDate={params.startDate}
          endDate={params.endDate}
          onStartDateChange={(value) => updateParams("startDate", value)}
          onEndDateChange={(value) => updateParams("endDate", value)}
        />

        <ToggleGroup<TransportationMode>
          legend="Transportation"
          variant="cards"
          value={params.transportation}
          onChange={(value) => updateParams("transportation", value)}
          options={[
            { value: "car", label: "I have a car" },
            { value: "no-car", label: "No car" },
          ]}
        />

        <ToggleGroup<ActivityType>
          legend="Activity"
          value={params.activity}
          onChange={(value) => updateParams("activity", value)}
          options={[
            { value: "hiking", label: "Hiking" },
            { value: "camping", label: "Camping" },
            { value: "both", label: "Hiking + Camping" },
          ]}
        />

        <ToggleGroup<Difficulty>
          legend="Difficulty"
          value={params.difficulty}
          onChange={(value) => updateParams("difficulty", value)}
          options={[
            { value: "easy", label: "Easy" },
            { value: "moderate", label: "Moderate" },
            { value: "hard", label: "Hard" },
          ]}
        />

        <BudgetSlider
          value={params.maxBudget}
          onChange={(value) => updateParams("maxBudget", value)}
        />

        {error && (
          <p role="alert" className="text-sm text-clay-dark">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-pill bg-clay px-6 py-3.5 font-medium text-paper transition-colors hover:bg-clay-dark"
        >
          Find My Adventure
        </button>
      </div>
    </form>
  );
}
