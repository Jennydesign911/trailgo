import Link from "next/link";
import { DiscoverDestination } from "@/lib/types";
import { formatTravelTime } from "@/lib/format";

const difficultyLabel: Record<DiscoverDestination["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

const activityLabel: Record<"hiking" | "camping", string> = {
  hiking: "Hiking",
  camping: "Camping",
};

const gradientClass: Record<DiscoverDestination["imageGradient"], string> = {
  "trail-1": "bg-trail-1",
  "trail-2": "bg-trail-2",
  "trail-3": "bg-trail-3",
};

function matchScoreTone(score: number) {
  if (score >= 85) return "bg-gold text-ink";
  if (score >= 70) return "bg-clay text-paper";
  return "bg-paper text-ink border border-mist";
}

function CarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2A2 2 0 0 1 19.5 8l1.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2.5" y="13" width="19" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7" cy="18.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="18.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function TransitIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 11.5h16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 20l2-3.5M17 20l-2-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8" cy="14" r="0.9" fill="currentColor" />
      <circle cx="16" cy="14" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function DestinationResultCard({
  destination,
}: {
  destination: DiscoverDestination;
}) {
  return (
    <article className="overflow-hidden rounded-card border border-mist bg-white/70 shadow-soft">
      <div
        className={`relative h-40 w-full ${gradientClass[destination.imageGradient]}`}
        role="img"
        aria-label={`Illustrative scene for ${destination.name}`}
      >
        <div
          className={`absolute right-3 top-3 flex flex-col items-center rounded-2xl px-3 py-1.5 leading-tight shadow-soft ${matchScoreTone(
            destination.adventureMatchScore
          )}`}
        >
          <span className="font-display text-lg">
            {destination.adventureMatchScore}%
          </span>
          <span className="text-[11px] opacity-80">Adventure Match</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl text-ink">
              {destination.name}
            </h3>
            <p className="mt-0.5 text-sm text-ink/60">{destination.region}</p>
          </div>
          <div className="shrink-0 text-sm text-ink/70">
            ★ {destination.rating.toFixed(1)}
          </div>
        </div>

        <p className="mt-3 text-sm text-ink/70">
          {destination.shortDescription}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-ink/80">
          <div>
            <dt className="sr-only">Difficulty</dt>
            <dd>{difficultyLabel[destination.difficulty]}</dd>
          </div>
          <div>
            <dt className="sr-only">Trail distance</dt>
            <dd>{destination.trailDistanceMiles} mi</dd>
          </div>
          <div>
            <dt className="sr-only">Travel time</dt>
            <dd>{formatTravelTime(destination.estimatedTravelTimeMinutes)}</dd>
          </div>
          <div>
            <dt className="sr-only">Activities</dt>
            <dd>{destination.activities.map((a) => activityLabel[a]).join(" + ")}</dd>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 text-moss">
            <dt className="sr-only">Transportation</dt>
            <dd className="flex items-center gap-1.5">
              {destination.transportationOptions.includes("no-car") ? (
                <TransitIcon />
              ) : (
                <CarIcon />
              )}
              <span className="text-ink/80">
                {destination.carFreeFriendly
                  ? "Car-free friendly"
                  : "Car required"}
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-between border-t border-mist pt-3">
          <span className="font-display text-lg text-clay-dark">
            ${destination.estimatedTripCost}
          </span>
          <Link
            href={`/adventure/${destination.id}`}
            className="rounded-pill bg-pine px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-pine-light"
          >
            View Adventure
          </Link>
        </div>
      </div>
    </article>
  );
}
