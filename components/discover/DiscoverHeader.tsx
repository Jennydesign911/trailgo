import Link from "next/link";
import { TripSearchParams } from "@/lib/types";
import { formatDateRange } from "@/lib/format";

const activityLabel: Record<TripSearchParams["activity"], string> = {
  hiking: "Hiking",
  camping: "Camping",
  both: "Hiking + Camping",
};

const difficultyLabel: Record<TripSearchParams["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

export function DiscoverHeader({ search }: { search: TripSearchParams }) {
  return (
    <header className="border-b border-mist bg-pine pb-8 pt-8 text-paper sm:pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/"
          className="text-sm text-paper/70 hover:text-paper"
        >
          ← Modify search
        </Link>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="font-display text-3xl">{search.location}</h1>
          <span className="text-paper/60">
            {formatDateRange(search.startDate, search.endDate)}
          </span>
        </div>

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/80">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Transportation</dt>
            <dd>{search.transportation === "car" ? "Has a car" : "No car"}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Activity</dt>
            <dd>{activityLabel[search.activity]}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Difficulty</dt>
            <dd>{difficultyLabel[search.difficulty]}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Budget</dt>
            <dd>Budget: ${search.maxBudget}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
