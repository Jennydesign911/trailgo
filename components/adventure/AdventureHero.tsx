import Link from "next/link";
import { DiscoverDestination } from "@/lib/types";
import { formatTravelTime } from "@/lib/format";

const gradientClass: Record<DiscoverDestination["imageGradient"], string> = {
  "trail-1": "bg-trail-1",
  "trail-2": "bg-trail-2",
  "trail-3": "bg-trail-3",
};

const activityLabel: Record<"hiking" | "camping", string> = {
  hiking: "Hiking",
  camping: "Camping",
};

const difficultyLabel: Record<DiscoverDestination["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

function matchScoreTone(score: number) {
  if (score >= 85) return "bg-gold text-ink";
  if (score >= 70) return "bg-clay text-paper";
  return "bg-white/90 text-ink border border-mist";
}

export function AdventureHero({
  destination,
}: {
  destination: DiscoverDestination;
}) {
  return (
    <section
      className={`relative overflow-hidden ${gradientClass[destination.imageGradient]}`}
    >
      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <Link href="/discover" className="text-sm text-paper/80 hover:text-paper">
          ← Back to results
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-paper sm:text-5xl">
              {destination.name}
            </h1>
            <p className="mt-1 text-paper/75">{destination.region}</p>
          </div>

          <div
            className={`flex flex-col items-center rounded-2xl px-4 py-2.5 leading-tight shadow-soft ${matchScoreTone(
              destination.adventureMatchScore
            )}`}
          >
            <span className="font-display text-2xl">
              {destination.adventureMatchScore}%
            </span>
            <span className="text-xs opacity-80">Adventure Match</span>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-paper/85">
          {destination.shortDescription}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/90">
          <div>
            <dt className="sr-only">Activities</dt>
            <dd>{destination.activities.map((a) => activityLabel[a]).join(" + ")}</dd>
          </div>
          <div>
            <dt className="sr-only">Difficulty</dt>
            <dd>{difficultyLabel[destination.difficulty]}</dd>
          </div>
          <div>
            <dt className="sr-only">Travel time</dt>
            <dd>{formatTravelTime(destination.estimatedTravelTimeMinutes)} away</dd>
          </div>
          <div>
            <dt className="sr-only">Estimated cost</dt>
            <dd>~${destination.estimatedTripCost} per trip</dd>
          </div>
          <div>
            <dt className="sr-only">Car-free friendly</dt>
            <dd>
              {destination.carFreeFriendly ? "Car-free friendly" : "Car required"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
